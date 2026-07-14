import { Router } from 'express';
import * as solutionsDb from '../db/solutions.js';
import * as problemsDb from '../db/problems.js';
import * as usersDb from '../db/users.js';
import auth from '../middleware/auth.js';
import { isAdminUser } from '../middleware/admin.js';
import { runLimiter } from '../middleware/rateLimiter.js';
import { executeTests, isValidFunctionName } from '../services/codeExecutor.js';
import { validateSolutionData } from '../utils/validators.js';
import { sendError } from '../utils/response.js';

const router = Router();

// All solution endpoints are private and require a verified user.
router.use(auth);

router.get('/', async (req, res) => {
  try {
    const solutions = await solutionsDb.getByUserId(req.userId);
    res.json({ solutions });
  } catch (err) {
    console.error('Get solutions error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// The server runs the tests and computes the score itself — the client only
// sends the code plus time/hint claims, so scores can't be forged outright.
router.post('/:problemId', runLimiter, async (req, res) => {
  try {
    // Keep problemId parsing strict to avoid silent coercions.
    const problemId = parseInt(req.params.problemId, 10);
    if (isNaN(problemId) || problemId <= 0) {
      return sendError(res, 400, 'Invalid problem ID', 'INVALID_PROBLEM_ID');
    }
    const { code, timeSpent, hintsUsed } = req.body;

    const validationErrors = validateSolutionData({ code, timeSpent, hintsUsed });
    if (validationErrors.length > 0) {
      return sendError(res, 400, validationErrors.join('; '), 'VALIDATION_ERROR', validationErrors);
    }

    const problem = await problemsDb.getById(problemId);
    if (!problem) {
      return sendError(res, 404, 'Problem not found', 'NOT_FOUND');
    }
    if (problem.published === false) {
      const user = await usersDb.findById(req.userId);
      if (!isAdminUser(user)) {
        return sendError(res, 404, 'Problem not found', 'NOT_FOUND');
      }
    }
    if (!isValidFunctionName(problem.functionName) || !(problem.testCases || []).length) {
      return sendError(res, 422, 'This problem cannot be graded automatically', 'NOT_GRADABLE');
    }

    const run = await executeTests(code, problem.testCases, problem.functionName);
    const totalTests = run.results.length;
    if (totalTests === 0) {
      // code didn't produce results (e.g. syntax error) — nothing to grade
      return sendError(res, 422, run.stderr || 'Code failed to run', 'RUN_FAILED');
    }
    const testsPassed = run.results.filter((r) => r.passed).length;

    // score = 70% from tests + up to 30 speed bonus - 5 per hint used, capped [0,100]
    // timeSpent/hintsUsed are still client-claimed; clamp them to sane ranges
    const cappedHints = Math.min(hintsUsed, (problem.hints || []).length);
    const timeBonus = Math.max(0, 30 - Math.floor(timeSpent / 60));
    const hintPenalty = cappedHints * 5;
    const score = Math.max(0, Math.min(100, Math.round((testsPassed / totalTests) * 70 + timeBonus - hintPenalty)));

    // Upsert keeps one latest record per user+problem pair.
    const solution = await solutionsDb.upsert(req.userId, problemId, {
      score,
      timeSpent,
      code,
      testsPassed,
      totalTests,
      hintsUsed: cappedHints,
      date: new Date().toISOString(),
    });

    res.json({
      solution: {
        problemId: solution.problemId,
        score: solution.score,
        timeSpent: solution.timeSpent,
        code: solution.code,
        testsPassed: solution.testsPassed,
        totalTests: solution.totalTests,
        hintsUsed: solution.hintsUsed,
        date: solution.date,
      },
      results: run.results,
    });
  } catch (err) {
    if (err.code === 'TIMEOUT') {
      return sendError(res, 408, 'Execution timed out (10s)', 'TIMEOUT');
    }
    if (err.code === 'UNAVAILABLE') {
      return sendError(res, 503, err.message, 'EXECUTION_UNAVAILABLE');
    }
    console.error('Save solution error:', err);
    return sendError(res, 500, 'Server error', 'SERVER_ERROR');
  }
});

export default router;
