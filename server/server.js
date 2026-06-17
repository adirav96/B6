import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import { initFirebase } from './firebase.js';
import authRoutes from './routes/auth.js';
import solutionsRoutes from './routes/solutions.js';
import activityRoutes from './routes/activity.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/solutions', solutionsRoutes);
app.use('/api/activity', activityRoutes);

app.get('/api/health', (_req, res) => res.json({ status: 'ok', database: 'firebase' }));

function start() {
  try {
    initFirebase();
    console.log('Connected to Firebase Firestore');
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  } catch (err) {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  }
}

start();
