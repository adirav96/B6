import { getDb } from '../config/firebase.js';

const COLLECTION = 'solutions';

function docId(userId, problemId) {
  return `${userId}_${problemId}`;
}

export async function getSolutionsByUser(userId) {
  const snapshot = await getDb()
    .collection(COLLECTION)
    .where('userId', '==', userId)
    .get();

  const solutions = {};
  snapshot.forEach((doc) => {
    const d = doc.data();
    solutions[d.problemId] = {
      score: d.score,
      timeSpent: d.timeSpent,
      code: d.code,
      testsPassed: d.testsPassed,
      totalTests: d.totalTests,
      hintsUsed: d.hintsUsed,
      date: d.date,
    };
  });
  return solutions;
}

export async function upsertSolution(userId, problemId, data) {
  const id = docId(userId, problemId);
  const payload = {
    userId,
    problemId,
    score: data.score,
    timeSpent: data.timeSpent,
    code: data.code,
    testsPassed: data.testsPassed,
    totalTests: data.totalTests,
    hintsUsed: data.hintsUsed ?? 0,
    date: data.date || new Date().toISOString(),
  };

  await getDb().collection(COLLECTION).doc(id).set(payload, { merge: true });
  return payload;
}
