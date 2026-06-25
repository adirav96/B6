import rateLimit from 'express-rate-limit';

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per IP
  message: 'יותר מדי ניסיונות התחברות. אנא נסו שוב בעוד 15 דקות.',
  standardHeaders: true,
  legacyHeaders: false,
});

export const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // 3 registrations per IP per hour
  message: 'יותר מדי ניסיונות הרשמה. אנא נסו שוב בעוד שעה.',
  standardHeaders: true,
  legacyHeaders: false,
});

export const chatLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 30, // 30 messages per minute
  message: 'יותר מדי בקשות. אנא חכו רגע.',
  standardHeaders: true,
  legacyHeaders: false,
});
