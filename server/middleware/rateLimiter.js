import rateLimit from 'express-rate-limit';

function isDevelopment() {
  return process.env.NODE_ENV !== 'production';
}

function limiterHandler(message) {
  return (req, res) => {
    res.status(429).json({
      error: message,
      errorCode: 'RATE_LIMITED',
    });
  };
}

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: isDevelopment() ? 50 : 5, // keep local dev usable while preserving prod protection
  message: 'Too many login attempts. Please try again in 15 minutes.',
  standardHeaders: true,
  legacyHeaders: false,
  handler: limiterHandler('Too many login attempts. Please try again in 15 minutes.'),
});

export const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: isDevelopment() ? 50 : 3, // keep local dev usable while preserving prod protection
  message: 'Too many registration attempts. Please try again in an hour.',
  standardHeaders: true,
  legacyHeaders: false,
  handler: limiterHandler('Too many registration attempts. Please try again in an hour.'),
});

export const chatLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: isDevelopment() ? 200 : 30, // keep local dev usable while preserving prod protection
  message: 'Too many requests. Please slow down.',
  standardHeaders: true,
  legacyHeaders: false,
  handler: limiterHandler('Too many requests. Please slow down.'),
});
