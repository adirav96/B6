import jwt from 'jsonwebtoken';
import { sendError } from '../utils/response.js';

// applied per-router, not globally — public routes (health check) stay open
export default function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return sendError(res, 401, 'Unauthorized — please log in', 'AUTH_MISSING');
  }

  try {
    const token = header.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    // covers both expired and tampered tokens
    return sendError(res, 401, 'Invalid token — please log in again', 'AUTH_INVALID');
  }
}
