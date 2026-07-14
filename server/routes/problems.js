import { Router } from 'express';
import auth from '../middleware/auth.js';
import admin from '../middleware/admin.js';
import * as problemsDb from '../db/problems.js';
import { validateProblemData } from '../utils/validators.js';
import { sendError } from '../utils/response.js';

const router = Router();

router.use(auth);

router.get('/', async (req, res) => {
  try {
    const all = await problemsDb.getAll();
    const problems = req.userRole === 'admin' ? all : all.filter((p) => p.published !== false);
    res.json({ problems });
  } catch (err) {
    console.error('Get problems error:', err);
    return sendError(res, 500, 'Server error', 'SERVER_ERROR');
  }
});

router.get('/:problemId', async (req, res) => {
  try {
    const problemId = parseInt(req.params.problemId, 10);
    if (isNaN(problemId) || problemId <= 0) {
      return sendError(res, 400, 'Invalid problem ID', 'INVALID_PROBLEM_ID');
    }

    const problem = await problemsDb.getById(problemId);
    if (!problem) {
      return sendError(res, 404, 'Problem not found', 'NOT_FOUND');
    }
    if (req.userRole !== 'admin' && problem.published === false) {
      return sendError(res, 404, 'Problem not found', 'NOT_FOUND');
    }

    res.json({ problem });
  } catch (err) {
    console.error('Get problem error:', err);
    return sendError(res, 500, 'Server error', 'SERVER_ERROR');
  }
});

router.post('/', admin, async (req, res) => {
  try {
    const validationErrors = validateProblemData(req.body, { isCreate: true });
    if (validationErrors.length > 0) {
      return sendError(res, 400, validationErrors.join('; '), 'VALIDATION_ERROR', validationErrors);
    }

    const problem = await problemsDb.create(req.body);
    return res.status(201).json({ problem });
  } catch (err) {
    if (err.code === 'ALREADY_EXISTS') {
      return sendError(res, 409, 'Problem already exists', 'ALREADY_EXISTS');
    }
    console.error('Create problem error:', err);
    return sendError(res, 500, 'Server error', 'SERVER_ERROR');
  }
});

router.put('/:problemId', admin, async (req, res) => {
  try {
    const problemId = parseInt(req.params.problemId, 10);
    if (isNaN(problemId) || problemId <= 0) {
      return sendError(res, 400, 'Invalid problem ID', 'INVALID_PROBLEM_ID');
    }

    const validationErrors = validateProblemData({ ...req.body, id: problemId }, { isCreate: false });
    if (validationErrors.length > 0) {
      return sendError(res, 400, validationErrors.join('; '), 'VALIDATION_ERROR', validationErrors);
    }

    const problem = await problemsDb.update(problemId, req.body);
    return res.json({ problem });
  } catch (err) {
    if (err.code === 'NOT_FOUND') {
      return sendError(res, 404, 'Problem not found', 'NOT_FOUND');
    }
    console.error('Update problem error:', err);
    return sendError(res, 500, 'Server error', 'SERVER_ERROR');
  }
});

router.delete('/:problemId', admin, async (req, res) => {
  try {
    const problemId = parseInt(req.params.problemId, 10);
    if (isNaN(problemId) || problemId <= 0) {
      return sendError(res, 400, 'Invalid problem ID', 'INVALID_PROBLEM_ID');
    }

    const removed = await problemsDb.remove(problemId);
    if (!removed) {
      return sendError(res, 404, 'Problem not found', 'NOT_FOUND');
    }

    return res.status(204).send();
  } catch (err) {
    console.error('Delete problem error:', err);
    return sendError(res, 500, 'Server error', 'SERVER_ERROR');
  }
});

export default router;
