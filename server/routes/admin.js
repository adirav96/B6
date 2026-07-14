import { Router } from 'express';
import auth from '../middleware/auth.js';
import admin from '../middleware/admin.js';
import * as usersDb from '../db/users.js';
import * as problemsDb from '../db/problems.js';

const router = Router();

router.use(auth);
router.use(admin);

function normalizeProblemPayload(body, id) {
  return {
    id: id ?? body.id,
    order: body.order ?? id ?? body.id,
    title: body.title,
    titleHe: body.titleHe,
    topic: body.topic,
    difficulty: body.difficulty,
    acceptance: Number(body.acceptance || 0),
    companies: Array.isArray(body.companies) ? body.companies : String(body.companies || '').split(',').map((s) => s.trim()).filter(Boolean),
    descriptionHe: body.descriptionHe,
    examples: Array.isArray(body.examples) ? body.examples : [],
    constraints: Array.isArray(body.constraints) ? body.constraints : String(body.constraints || '').split('\n').map((s) => s.trim()).filter(Boolean),
    starterCode: body.starterCode || { python: '' },
    functionName: body.functionName,
    hints: Array.isArray(body.hints) ? body.hints : [],
    testCases: Array.isArray(body.testCases) ? body.testCases : [],
  };
}

router.get('/users', async (_req, res) => {
  try {
    const users = await usersDb.getAll();
    res.json({ users: users.map(usersDb.toProfile) });
  } catch (err) {
    console.error('Admin users list error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.patch('/users/:userId/role', async (req, res) => {
  try {
    const nextRole = req.body?.role === 'admin' || req.body?.isAdmin === true ? 'admin' : 'user';
    const user = await usersDb.updateRole(req.params.userId, nextRole);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ user: usersDb.toProfile(user) });
  } catch (err) {
    console.error('Admin update role error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/problems', async (_req, res) => {
  try {
    const problems = await problemsDb.getAll();
    res.json({ problems });
  } catch (err) {
    console.error('Admin problems list error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/problems', async (req, res) => {
  try {
    const problem = normalizeProblemPayload(req.body);
    if (!problem.title || !problem.functionName) {
      return res.status(400).json({ error: 'Missing required problem fields' });
    }
    const saved = await problemsDb.create(problem);
    res.status(201).json({ problem: saved });
  } catch (err) {
    if (err.code === 'ALREADY_EXISTS') {
      return res.status(409).json({ error: 'Problem already exists' });
    }
    console.error('Admin create problem error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/problems/:problemId', async (req, res) => {
  try {
    const problemId = parseInt(req.params.problemId, 10);
    if (Number.isNaN(problemId) || problemId <= 0) {
      return res.status(400).json({ error: 'Invalid problem ID' });
    }
    const problem = normalizeProblemPayload(req.body, problemId);
    const saved = await problemsDb.update(problemId, problem);
    res.json({ problem: saved });
  } catch (err) {
    if (err.code === 'NOT_FOUND') {
      return res.status(404).json({ error: 'Problem not found' });
    }
    console.error('Admin update problem error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/problems/:problemId', async (req, res) => {
  try {
    const problemId = parseInt(req.params.problemId, 10);
    if (Number.isNaN(problemId) || problemId <= 0) {
      return res.status(400).json({ error: 'Invalid problem ID' });
    }
    await problemsDb.remove(problemId);
    res.json({ success: true });
  } catch (err) {
    console.error('Admin delete problem error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;