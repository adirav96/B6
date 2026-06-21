import { getDb } from '../config/firebase.js';

const COLLECTION = 'activity';

function docId(userId, date) {
  return `${userId}_${date}`;
}

export async function getActivityByUser(userId) {
  const snapshot = await getDb()
    .collection(COLLECTION)
    .where('userId', '==', userId)
    .get();

  const activityLog = snapshot.docs
    .map((doc) => {
      const d = doc.data();
      return { date: d.date, count: d.count };
    })
    .sort((a, b) => a.date.localeCompare(b.date));

  return activityLog;
}

export async function recordActivity(userId, date) {
  const dateStr = date || new Date().toISOString().split('T')[0];
  const id = docId(userId, dateStr);
  const ref = getDb().collection(COLLECTION).doc(id);

  const result = await getDb().runTransaction(async (transaction) => {
    const doc = await transaction.get(ref);
    if (doc.exists) {
      const count = (doc.data().count || 0) + 1;
      transaction.update(ref, { count });
      return { date: dateStr, count };
    }
    transaction.set(ref, { userId, date: dateStr, count: 1 });
    return { date: dateStr, count: 1 };
  });

  return result;
}
