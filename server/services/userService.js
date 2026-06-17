import bcrypt from 'bcryptjs';
import { getDb } from '../config/firebase.js';

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

export async function findUserByEmail(email) {
  const snapshot = await getDb()
    .collection(COLLECTION)
    .where('email', '==', email.toLowerCase().trim())
    .limit(1)
    .get();

  if (snapshot.empty) return null;

  const doc = snapshot.docs[0];
  return { id: doc.id, ...doc.data() };
}

export async function findUserById(id) {
  const doc = await getDb().collection(COLLECTION).doc(id).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() };
}

export async function createUser({ name, email, password, university }) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const userData = {
    name: name.trim(),
    email: email.toLowerCase().trim(),
    password: hashedPassword,
    university: university || '',
    joinDate: new Date().toISOString().split('T')[0],
  };

  const ref = await getDb().collection(COLLECTION).add(userData);
  return { id: ref.id, ...userData };
}

export async function comparePassword(user, candidatePassword) {
  return bcrypt.compare(candidatePassword, user.password);
}
