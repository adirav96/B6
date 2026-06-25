import jwt from 'jsonwebtoken';
import { sendError } from '../utils/response.js';

export default function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return sendError(res, 401, 'אין הרשאה — נא להתחבר', 'AUTH_MISSING');
  }

  try {
    const token = header.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return sendError(res, 401, 'טוקן לא תקין — נא להתחבר מחדש', 'AUTH_INVALID');
  }
}
