import bcrypt from 'bcryptjs';
import { getDb } from '../firebase.js';

const COLLECTION = 'users';

export function toProfile(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    university: user.university || '',
    joinDate: user.joinDate,
  };
}

export async function findByEmail(email) {
  const normalized = email.toLowerCase().trim();
  const snap = await getDb()
    .collection(COLLECTION)
    .where('email', '==', normalized)
    .limit(1)
    .get();

  if (snap.empty) return null;

  const doc = snap.docs[0];
  return { id: doc.id, ...doc.data() };
}

export async function findById(id) {
  const doc = await getDb().collection(COLLECTION).doc(id).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() };
}

export async function createUser({ name, email, password, university }) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const data = {
    name: name.trim(),
    email: email.toLowerCase().trim(),
    password: hashedPassword,
    university: university || '',
    joinDate: new Date().toISOString().split('T')[0],
  };

  const ref = await getDb().collection(COLLECTION).add(data);
  return { id: ref.id, ...data };
}

export async function comparePassword(user, candidatePassword) {
  return bcrypt.compare(candidatePassword, user.password);
}
