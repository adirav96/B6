import { Router } from 'express';
import * as activityDb from '../db/activity.js';
import auth from '../middleware/auth.js';
import { validateActivityData } from '../utils/validators.js';
import { sendError } from '../utils/response.js';

const router = Router();

router.use(auth);

router.get('/', async (req, res) => {
  try {
    const activityLog = await activityDb.getByUserId(req.userId);
    res.json({ activityLog });
  } catch (err) {
    console.error('Get activity error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { date } = req.body;

    const validationErrors = validateActivityData({ date });
    if (validationErrors.length > 0) {
      return sendError(res, 400, validationErrors.join('; '), 'VALIDATION_ERROR', validationErrors);
    }

    const entry = await activityDb.increment(req.userId, date);
    res.json(entry);
  } catch (err) {
    console.error('Save activity error:', err);
    return sendError(res, 500, 'Server error', 'SERVER_ERROR');
  }
});

export default router;
