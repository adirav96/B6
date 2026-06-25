import { Router } from 'express';
import * as solutionsDb from '../db/solutions.js';
import auth from '../middleware/auth.js';
import { validateSolutionData } from '../utils/validators.js';

const router = Router();

router.use(auth);

router.get('/', async (req, res) => {
  try {
    const solutions = await solutionsDb.getByUserId(req.userId);
    res.json({ solutions });
  } catch (err) {
    console.error('Get solutions error:', err);
    res.status(500).json({ error: 'שגיאת שרת' });
  }
});

router.post('/:problemId', async (req, res) => {
  try {
    const problemId = Number(req.params.problemId);
    const { score, timeSpent, code, testsPassed, totalTests, hintsUsed } = req.body;

    const validationErrors = validateSolutionData({ score, timeSpent, code, testsPassed, totalTests, hintsUsed });
    if (validationErrors.length > 0) {
      return res.status(400).json({ error: validationErrors.join('; ') });
    }

    const solution = await solutionsDb.upsert(req.userId, problemId, {
      score,
      timeSpent,
      code,
      testsPassed,
      totalTests,
      hintsUsed,
      date: new Date().toISOString(),
    });

    res.json({
      problemId: solution.problemId,
      score: solution.score,
      timeSpent: solution.timeSpent,
      code: solution.code,
      testsPassed: solution.testsPassed,
      totalTests: solution.totalTests,
      hintsUsed: solution.hintsUsed,
      date: solution.date,
    });
  } catch (err) {
    console.error('Save solution error:', err);
    res.status(500).json({ error: 'שגיאת שרת' });
  }
});

export default router;
