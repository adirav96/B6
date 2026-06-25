import { Router } from 'express';
import jwt from 'jsonwebtoken';
import * as usersDb from '../db/users.js';
import auth from '../middleware/auth.js';
import { loginLimiter, registerLimiter } from '../middleware/rateLimiter.js';
import { validateEmail } from '../utils/validators.js';
import { isStrongPassword, getPasswordError } from '../utils/security.js';
import { sendError } from '../utils/response.js';

const router = Router();

// tokens expire after 7 days — long enough to not annoy users, short enough to rotate regularly
function signToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

router.post('/register', registerLimiter, async (req, res) => {
  try {
    const { name, email, password, university } = req.body;

    if (!name || !email || !password) {
      return sendError(res, 400, 'Please fill in all required fields', 'MISSING_FIELDS');
    }
    if (!isStrongPassword(password)) {
      return sendError(res, 400, getPasswordError(), 'WEAK_PASSWORD');
    }
    if (!validateEmail(email)) {
      return sendError(res, 400, 'Invalid email address', 'INVALID_EMAIL');
    }

    const existing = await usersDb.findByEmail(email);
    if (existing) {
      return sendError(res, 409, 'This email is already registered', 'EMAIL_EXISTS');
    }

    const user = await usersDb.createUser({ name, email, password, university });
    const token = signToken(user.id);

    res.status(201).json({ token, user: usersDb.toProfile(user) });
  } catch (err) {
    console.error('Register error:', err);
    return sendError(res, 500, 'Server error — please try again later', 'SERVER_ERROR');
  }
});

router.post('/login', loginLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendError(res, 400, 'Please enter your email and password', 'MISSING_FIELDS');
    }
    if (!validateEmail(email)) {
      return sendError(res, 400, 'Invalid email address', 'INVALID_EMAIL');
    }

    const user = await usersDb.findByEmail(email);
    // compare returns false for non-existent user too — keeps timing consistent
    if (!user || !(await usersDb.comparePassword(user, password))) {
      return sendError(res, 401, 'Incorrect email or password', 'INVALID_CREDENTIALS');
    }

    const token = signToken(user.id);
    res.json({ token, user: usersDb.toProfile(user) });
  } catch (err) {
    console.error('Login error:', err);
    return sendError(res, 500, 'Server error — please try again later', 'SERVER_ERROR');
  }
});

router.get('/me', auth, async (req, res) => {
  try {
    const user = await usersDb.findById(req.userId);
    if (!user) return sendError(res, 404, 'User not found', 'NOT_FOUND');
    res.json({ user: usersDb.toProfile(user) });
  } catch (err) {
    console.error('Me error:', err);
    return sendError(res, 500, 'Server error', 'SERVER_ERROR');
  }
});

export default router;
