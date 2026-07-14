import { getDb } from '../firebase.js';

const COLLECTION = 'problems';

function normalizeProblem(doc) {
  const raw = doc.data() || {};
  const idValue = raw.id ?? doc.id;
  const id = Number(idValue);

  return {
    id: Number.isFinite(id) ? id : idValue,
    title: raw.title || '',
    titleHe: raw.titleHe || '',
    topic: raw.topic || '',
    difficulty: raw.difficulty || 'easy',
    acceptance: typeof raw.acceptance === 'number' ? raw.acceptance : 0,
    companies: Array.isArray(raw.companies) ? raw.companies : [],
    descriptionHe: raw.descriptionHe || '',
    examples: Array.isArray(raw.examples) ? raw.examples : [],
    constraints: Array.isArray(raw.constraints) ? raw.constraints : [],
    starterCode: raw.starterCode || { python: '' },
    functionName: raw.functionName || '',
    testCases: Array.isArray(raw.testCases) ? raw.testCases : [],
    hints: Array.isArray(raw.hints) ? raw.hints : [],
    published: raw.published !== false,
    updatedAt: raw.updatedAt || null,
    createdAt: raw.createdAt || null,
  };
}

export async function getAll() {
  const snap = await getDb().collection(COLLECTION).get();
  return snap.docs.map(normalizeProblem).sort((a, b) => Number(a.id) - Number(b.id));
}

export async function getById(problemId) {
  const idStr = String(problemId);
  const directDoc = await getDb().collection(COLLECTION).doc(idStr).get();
  if (directDoc.exists) return normalizeProblem(directDoc);

  const snap = await getDb().collection(COLLECTION).where('id', '==', Number(problemId)).limit(1).get();
  if (snap.empty) return null;
  return normalizeProblem(snap.docs[0]);
}

export async function create(problemData) {
  const idStr = String(problemData.id);
  const ref = getDb().collection(COLLECTION).doc(idStr);
  const existing = await ref.get();
  if (existing.exists) {
    const err = new Error('Problem already exists');
    err.code = 'ALREADY_EXISTS';
    throw err;
  }

  const payload = {
    ...problemData,
    id: Number(problemData.id),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  await ref.set(payload);
  const saved = await ref.get();
  return normalizeProblem(saved);
}

export async function update(problemId, updates) {
  const idStr = String(problemId);
  const ref = getDb().collection(COLLECTION).doc(idStr);
  const existing = await ref.get();

  if (!existing.exists) {
    const err = new Error('Problem not found');
    err.code = 'NOT_FOUND';
    throw err;
  }

  const payload = {
    ...updates,
    id: Number(problemId),
    updatedAt: new Date().toISOString(),
  };

  await ref.set(payload, { merge: true });
  const saved = await ref.get();
  return normalizeProblem(saved);
}

export async function remove(problemId) {
  const idStr = String(problemId);
  const ref = getDb().collection(COLLECTION).doc(idStr);
  const existing = await ref.get();
  if (!existing.exists) return false;

  await ref.delete();
  return true;
}
