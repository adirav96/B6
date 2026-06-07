import { Router } from 'express';
import Solution from '../models/Solution.js';
import auth from '../middleware/auth.js';

const router = Router();

router.use(auth);

router.get('/', async (req, res) => {
  try {
    const docs = await Solution.find({ userId: req.userId }).lean();
    const solutions = {};
    docs.forEach((d) => {
      solutions[d.problemId] = {
        score: d.score,
        timeSpent: d.timeSpent,
        code: d.code,
        testsPassed: d.testsPassed,
        totalTests: d.totalTests,
        hintsUsed: d.hintsUsed,
        date: d.date,
      };
    });
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

    const solution = await Solution.findOneAndUpdate(
      { userId: req.userId, problemId },
      { score, timeSpent, code, testsPassed, totalTests, hintsUsed, date: new Date().toISOString() },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

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
