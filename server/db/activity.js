import { getDb } from '../firebase.js';

const COLLECTION = 'activity';

function docId(userId, date) {
  return `${userId}_${date}`;
}

export async function getByUserId(userId) {
  const snap = await getDb().collection(COLLECTION).where('userId', '==', userId).get();

  return snap.docs
    .map((doc) => {
      const data = doc.data();
      return { date: data.date, count: data.count };
    })
    .sort((a, b) => a.date.localeCompare(b.date));
}

export async function increment(userId, date) {
  const dateStr = date || new Date().toISOString().split('T')[0];
  const ref = getDb().collection(COLLECTION).doc(docId(userId, dateStr));

  const result = await getDb().runTransaction(async (tx) => {
    const doc = await tx.get(ref);
    let newCount;

    if (doc.exists) {
      newCount = doc.data().count + 1;
      tx.update(ref, { count: newCount });
    } else {
      newCount = 1;
      tx.set(ref, { userId, date: dateStr, count: 1 });
    }

    return { date: dateStr, count: newCount };
  });

  return result;
}
