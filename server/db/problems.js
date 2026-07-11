import { getDb } from '../firebase.js';

const COLLECTION = 'problems';

function normalizeProblem(doc) {
    const data = doc.data();
    let testCases = data.testCases;

    if (!testCases && data.testCasesJson) {
        try {
            testCases = JSON.parse(data.testCasesJson);
        } catch {
            testCases = [];
        }
    }

    return { id: Number(doc.id), ...data, ...(testCases ? { testCases } : {}) };
}

export async function getAll() {
    const snap = await getDb().collection(COLLECTION).orderBy('order').get();
    return snap.docs.map(normalizeProblem);
}

export async function findById(id) {
    const doc = await getDb().collection(COLLECTION).doc(String(id)).get();
    if (!doc.exists) return null;
    return normalizeProblem(doc);
}

export async function upsert(problem) {
    const id = problem.id ?? problem.order;
    if (id === undefined || id === null) {
        throw new Error('Problem id is required');
    }

    const data = {
        ...problem,
        id: Number(id),
        order: problem.order ?? Number(id),
    };

    await getDb().collection(COLLECTION).doc(String(id)).set(data, { merge: true });
    return data;
}

export async function replaceAll(problems) {
    const batch = getDb().batch();
    problems.forEach((problem) => {
        const id = problem.id ?? problem.order;
        if (id === undefined || id === null) {
            throw new Error('Problem id is required');
        }
        const data = {
            ...problem,
            id: Number(id),
            order: problem.order ?? Number(id),
        };
        batch.set(getDb().collection(COLLECTION).doc(String(id)), data, { merge: true });
    });
    await batch.commit();
}