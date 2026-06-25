import { Router } from 'express';
import jwt from 'jsonwebtoken';
import * as usersDb from '../db/users.js';
import auth from '../middleware/auth.js';
import { loginLimiter, registerLimiter } from '../middleware/rateLimiter.js';
import { validateEmail } from '../utils/validators.js';
import { isStrongPassword, getPasswordError } from '../utils/security.js';

const router = Router();

function signToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

router.post('/register', registerLimiter, async (req, res) => {
  try {
    const { name, email, password, university } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'נא למלא את כל שדות החובה' });
    }
    if (!isStrongPassword(password)) {
      return res.status(400).json({ error: getPasswordError() });
    }
    if (!validateEmail(email)) {
      return res.status(400).json({ error: 'אימייל אינו תקין' });
    }

    const existing = await usersDb.findByEmail(email);
    if (existing) {
      return res.status(409).json({ error: 'אימייל זה כבר רשום במערכת' });
    }

    const user = await usersDb.createUser({ name, email, password, university });
    const token = signToken(user.id);

    res.status(201).json({ token, user: usersDb.toProfile(user) });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'שגיאת שרת — נסו שוב מאוחר יותר' });
  }
});

router.post('/login', loginLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'נא למלא אימייל וסיסמה' });
    }
    if (!validateEmail(email)) {
      return res.status(400).json({ error: 'אימייל אינו תקין' });
    }

    const user = await usersDb.findByEmail(email);
    if (!user || !(await usersDb.comparePassword(user, password))) {
      return res.status(401).json({ error: 'אימייל או סיסמה שגויים' });
    }

    const token = signToken(user.id);
    res.json({ token, user: usersDb.toProfile(user) });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'שגיאת שרת — נסו שוב מאוחר יותר' });
  }
});

router.get('/me', auth, async (req, res) => {
  try {
    const user = await usersDb.findById(req.userId);
    if (!user) return res.status(404).json({ error: 'משתמש לא נמצא' });
    res.json({ user: usersDb.toProfile(user) });
  } catch (err) {
    console.error('Me error:', err);
    res.status(500).json({ error: 'שגיאת שרת' });
  }
});

export default router;
