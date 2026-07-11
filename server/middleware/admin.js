import { sendError } from '../utils/response.js';
import * as usersDb from '../db/users.js';

export default async function adminMiddleware(req, res, next) {
  try {
    const user = await usersDb.findById(req.userId);
    if (!user || !user.isAdmin) {
      return sendError(res, 403, 'Forbidden — admin access required', 'ADMIN_REQUIRED');
    }
    req.currentUser = user;
    next();
  } catch (err) {
    console.error('Admin auth error:', err);
    return sendError(res, 500, 'Server error', 'SERVER_ERROR');
  }
}