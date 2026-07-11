import { Router } from 'express';
import auth from '../middleware/auth.js';
import * as problemsDb from '../db/problems.js';

const router = Router();

router.use(auth);

function stripHiddenFields(problem) {
    if (!problem) return problem;
    const { testCases, testCasesJson, ...publicProblem } = problem;
    return publicProblem;
}

router.get('/', async (_req, res) => {
    try {
        const problems = await problemsDb.getAll();
        res.json({ problems: problems.map(stripHiddenFields) });
    } catch (err) {
        console.error('Get problems error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/:problemId', async (req, res) => {
    try {
        const problemId = parseInt(req.params.problemId, 10);
        if (Number.isNaN(problemId) || problemId <= 0) {
            return res.status(400).json({ error: 'Invalid problem ID' });
        }

        const includeTests = req.query.includeTests === 'true';
        const problem = await problemsDb.findById(problemId);
        if (!problem) {
            return res.status(404).json({ error: 'Problem not found' });
        }

        res.json({ problem: includeTests ? problem : stripHiddenFields(problem) });
    } catch (err) {
        console.error('Get problem error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

export default router;