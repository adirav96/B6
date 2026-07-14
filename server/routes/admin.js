import { Router } from 'express';
import auth from '../middleware/auth.js';
import admin from '../middleware/admin.js';
import * as usersDb from '../db/users.js';

const router = Router();

router.use(auth);
router.use(admin);

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

    if (nextRole === 'user') {
      const target = await usersDb.findById(req.params.userId);
      if (target?.role === 'admin') {
        const admins = await usersDb.getAll();
        const adminCount = admins.filter((u) => u.role === 'admin').length;
        if (adminCount <= 1) {
          return res.status(400).json({ error: 'Cannot remove the last admin' });
        }
      }
    }

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

export default router;