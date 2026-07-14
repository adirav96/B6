import * as usersDb from '../db/users.js';
import { sendError } from '../utils/response.js';

function getAdminEmails() {
  return (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

export default async function adminMiddleware(req, res, next) {
  try {
    const user = await usersDb.findById(req.userId);
    if (!user) {
      return sendError(res, 401, 'Unauthorized — user not found', 'AUTH_USER_NOT_FOUND');
    }

    const adminEmails = getAdminEmails();
    const isAdmin = user.role === 'admin' || adminEmails.includes((user.email || '').toLowerCase());

    if (!isAdmin) {
      return sendError(res, 403, 'Admin access required', 'ADMIN_REQUIRED');
    }

    req.user = user;
    next();
  } catch (err) {
    console.error('Admin check error:', err);
    return sendError(res, 500, 'Server error', 'SERVER_ERROR');
  }
}
