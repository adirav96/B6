export const AI_CONFIG = {
  model: process.env.ANTHROPIC_MODEL || 'claude-haiku-4-5-20251001',
  maxTokens: parseInt(process.env.AI_MAX_TOKENS || '400', 10),
};

export const SERVER_CONFIG = {
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
};
