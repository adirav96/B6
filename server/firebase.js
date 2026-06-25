import { readFileSync } from 'fs';
import admin from 'firebase-admin';

let db = null;

// supports three credential strategies so the app works both locally and in CI/CD
function loadServiceAccount() {
  if (process.env.FIREBASE_SERVICE_ACCOUNT_PATH) {
    return JSON.parse(readFileSync(process.env.FIREBASE_SERVICE_ACCOUNT_PATH, 'utf8'));
  }

  if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    return JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
  }

  const { FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY } = process.env;
  if (FIREBASE_PROJECT_ID && FIREBASE_CLIENT_EMAIL && FIREBASE_PRIVATE_KEY) {
    return {
      project_id: FIREBASE_PROJECT_ID,
      client_email: FIREBASE_CLIENT_EMAIL,
      // env vars escape newlines as \n — restore them for the PEM key
      private_key: FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    };
  }

  throw new Error(
    'Firebase credentials missing. Set FIREBASE_SERVICE_ACCOUNT_PATH, FIREBASE_SERVICE_ACCOUNT_JSON, or FIREBASE_PROJECT_ID + FIREBASE_CLIENT_EMAIL + FIREBASE_PRIVATE_KEY in .env'
  );
}

export function initFirebase() {
  // guard against double-init (e.g. hot reload in dev)
  if (!admin.apps.length) {
    const serviceAccount = loadServiceAccount();
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  db = admin.firestore();
  return db;
}

export function getDb() {
  if (!db) {
    throw new Error('Firebase not initialized. Call initFirebase() first.');
  }
  return db;
}
