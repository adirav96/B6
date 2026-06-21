import { getDb } from '../firebase.js';

const COLLECTION = 'solutions';

function docId(userId, problemId) {
  return `${userId}_${problemId}`;
}

export async function getByUserId(userId) {
  const snap = await getDb().collection(COLLECTION).where('userId', '==', userId).get();

  const solutions = {};
  snap.forEach((doc) => {
    const data = doc.data();
    solutions[data.problemId] = {
      score: data.score,
      timeSpent: data.timeSpent,
      code: data.code,
      testsPassed: data.testsPassed,
      totalTests: data.totalTests,
      hintsUsed: data.hintsUsed,
      date: data.date,
    };
  });

  return solutions;
}

export async function upsert(userId, problemId, payload) {
  const data = {
    userId,
    problemId,
    score: payload.score,
    timeSpent: payload.timeSpent,
    code: payload.code,
    testsPassed: payload.testsPassed,
    totalTests: payload.totalTests,
    hintsUsed: payload.hintsUsed ?? 0,
    date: payload.date || new Date().toISOString(),
  };

  const ref = getDb().collection(COLLECTION).doc(docId(userId, problemId));
  await ref.set(data, { merge: true });

  const saved = await ref.get();
  return saved.data();
}
