import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import { initFirebase } from './firebase.js';
import { errorHandler } from './middleware/errorHandler.js';
import { requestLogger } from './middleware/logger.js';
import authRoutes from './routes/auth.js';
import problemsRoutes from './routes/problems.js';
import solutionsRoutes from './routes/solutions.js';
import activityRoutes from './routes/activity.js';
import adminRoutes from './routes/admin.js';
import chatRoutes from './routes/chat.js';
import runRoutes from './routes/run.js';

const app = express();
const PORT = process.env.PORT || 5000;

// allow requests from the Next.js dev server and production frontend
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5000',
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));
app.use(requestLogger);
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/problems', problemsRoutes);
app.use('/api/solutions', solutionsRoutes);
app.use('/api/activity', activityRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/run', runRoutes);

import { getDb } from './firebase.js';

app.get('/api/health', async (_req, res) => {
  try {
    // Try a light Firestore read
    await getDb().collection('_healthcheck').limit(1).get();
    res.json({ status: 'ok', database: 'firebase', timestamp: new Date().toISOString() });
  } catch (err) {
    console.error('Health check failed:', err.message);
    res.status(503).json({ status: 'unhealthy', error: err.message });
  }
});

// Global error handler
app.use(errorHandler);

// Unhandled rejection handler
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

async function start() {
  try {
    initFirebase();
    // Run a dummy read before accepting traffic — Firestore cold-starts can take ~1s
    // and the first real request would time out without this
    await getDb().collection('_healthcheck').limit(1).get();
    console.log('Connected to Firebase Firestore');
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  } catch (err) {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  }
}

start();
