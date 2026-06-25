/**
 * Standardized response helpers to keep error format consistent
 */
export function sendError(res, status = 500, message = 'שגיאת שרת', code = null, details = null) {
  const payload = { error: message };
  if (code) payload.errorCode = code;
  if (details) payload.details = details;
  return res.status(status).json(payload);
}

export function sendSuccess(res, data) {
  // Preserve existing behavior for simple responses
  return res.json(data);
}
