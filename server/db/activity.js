import { getDb } from '../firebase.js';

const COLLECTION = 'activities';

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

  await getDb().runTransaction(async (tx) => {
    const doc = await tx.get(ref);

    if (doc.exists) {
      tx.update(ref, { count: doc.data().count + 1 });
    } else {
      tx.set(ref, { userId, date: dateStr, count: 1 });
    }
  });

  const saved = await ref.get();
  const data = saved.data();
  return { date: data.date, count: data.count };
}
