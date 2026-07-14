import express from 'express';
import authMiddleware from '../middleware/auth.js';
import { runLimiter } from '../middleware/rateLimiter.js';
import * as problemsDb from '../db/problems.js';
import * as usersDb from '../db/users.js';
import { isAdminUser } from '../middleware/admin.js';
import { executeTests, isValidFunctionName } from '../services/codeExecutor.js';

const router = express.Router();

router.post('/', authMiddleware, runLimiter, async (req, res) => {
  try {
    const { code, testCases, functionName, problemId } = req.body;
    if (!code || !functionName) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    // functionName is interpolated into the harness — keep it a plain identifier
    if (!isValidFunctionName(functionName)) {
      return res.status(400).json({ error: 'Invalid function name' });
    }

    let activeTestCases = Array.isArray(testCases) ? testCases : [];
    if (activeTestCases.length === 0 && problemId) {
      const problem = await problemsDb.getById(problemId);
      if (!problem) {
        return res.status(404).json({ error: 'Problem not found' });
      }
      if (problem.published === false) {
        const user = await usersDb.findById(req.userId);
        if (!isAdminUser(user)) {
          return res.status(404).json({ error: 'Problem not found' });
        }
      }
      activeTestCases = problem.testCases || [];
    }

    if (activeTestCases.length === 0) {
      return res.status(400).json({ error: 'Missing test cases' });
    }

    const result = await executeTests(code, activeTestCases, functionName);
    return res.json(result);
  } catch (err) {
    if (err.code === 'TIMEOUT') {
      return res.status(408).json({ error: 'Execution timed out (10s)' });
    }
    if (err.code === 'UNAVAILABLE') {
      return res.status(503).json({ error: err.message });
    }
    console.error('Run error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

export default router;
