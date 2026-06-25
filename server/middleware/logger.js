import morgan from 'morgan';

// Custom morgan format for request logging
const morganFormat = ':method :url :status :response-time ms - :res[content-length]';

export const requestLogger = morgan(morganFormat, {
  skip: (req) => req.path === '/api/health', // Skip health checks
});
