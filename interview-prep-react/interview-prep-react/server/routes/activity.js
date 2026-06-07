import { Router } from 'express';
import Activity from '../models/Activity.js';
import auth from '../middleware/auth.js';

const router = Router();

router.use(auth);

router.get('/', async (req, res) => {
  try {
    const docs = await Activity.find({ userId: req.userId }).sort({ date: 1 }).lean();
    const activityLog = docs.map((d) => ({ date: d.date, count: d.count }));
    res.json({ activityLog });
  } catch (err) {
    console.error('Get activity error:', err);
    res.status(500).json({ error: 'שגיאת שרת' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { date } = req.body;
    const dateStr = date || new Date().toISOString().split('T')[0];

    const entry = await Activity.findOneAndUpdate(
      { userId: req.userId, date: dateStr },
      { $inc: { count: 1 } },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.json({ date: entry.date, count: entry.count });
  } catch (err) {
    console.error('Save activity error:', err);
    res.status(500).json({ error: 'שגיאת שרת' });
  }
});

export default router;
