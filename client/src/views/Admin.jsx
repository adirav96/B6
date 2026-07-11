'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  apiCreateAdminProblem,
  apiDeleteAdminProblem,
  apiGetAdminProblems,
  apiGetAdminUsers,
  apiSetUserAdmin,
  apiUpdateAdminProblem,
} from '@/services/api';

const emptyProblem = {
  title: '',
  titleHe: '',
  topic: '',
  difficulty: 'easy',
  acceptance: 0,
  companies: '',
  descriptionHe: '',
  examplesJson: '[]',
  constraintsText: '',
  starterCodePython: '',
  functionName: '',
  hintsJson: '[]',
  testCasesJson: '[]',
};

function toForm(problem) {
  return {
    id: problem.id,
    title: problem.title || '',
    titleHe: problem.titleHe || '',
    topic: problem.topic || '',
    difficulty: problem.difficulty || 'easy',
    acceptance: problem.acceptance ?? 0,
    companies: Array.isArray(problem.companies) ? problem.companies.join(', ') : '',
    descriptionHe: problem.descriptionHe || '',
    examplesJson: JSON.stringify(problem.examples || [], null, 2),
    constraintsText: (problem.constraints || []).join('\n'),
    starterCodePython: problem.starterCode?.python || '',
    functionName: problem.functionName || '',
    hintsJson: JSON.stringify(problem.hints || [], null, 2),
    testCasesJson: JSON.stringify(problem.testCases || [], null, 2),
  };
}

function parseMaybeJson(value, fallback) {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

function formToPayload(form) {
  return {
    title: form.title.trim(),
    titleHe: form.titleHe.trim(),
    topic: form.topic.trim(),
    difficulty: form.difficulty,
    acceptance: Number(form.acceptance || 0),
    companies: form.companies.split(',').map((s) => s.trim()).filter(Boolean),
    descriptionHe: form.descriptionHe.trim(),
    examples: parseMaybeJson(form.examplesJson, []),
    constraints: form.constraintsText.split('\n').map((s) => s.trim()).filter(Boolean),
    starterCode: { python: form.starterCodePython },
    functionName: form.functionName.trim(),
    hints: parseMaybeJson(form.hintsJson, []),
    testCases: parseMaybeJson(form.testCasesJson, []),
  };
}

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [problems, setProblems] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [form, setForm] = useState(emptyProblem);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const selectedProblem = useMemo(() => problems.find((p) => p.id === selectedId), [problems, selectedId]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [{ users: adminUsers }, { problems: adminProblems }] = await Promise.all([
        apiGetAdminUsers(),
        apiGetAdminProblems(),
      ]);
      setUsers(adminUsers || []);
      setProblems(adminProblems || []);
      setError('');
      if (selectedId && !adminProblems.some((p) => p.id === selectedId)) {
        setSelectedId(null);
        setForm(emptyProblem);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectedProblem) {
      setForm(toForm(selectedProblem));
    }
  }, [selectedProblem]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = formToPayload(form);
      if (selectedId) {
        await apiUpdateAdminProblem(selectedId, payload);
      } else {
        await apiCreateAdminProblem(payload);
      }
      setSelectedId(null);
      setForm(emptyProblem);
      await loadData();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (problem) => {
    setSelectedId(problem.id);
    setForm(toForm(problem));
  };

  const handleDelete = async (problemId) => {
    if (!confirm('למחוק שאלה זו?')) return;
    setSaving(true);
    try {
      await apiDeleteAdminProblem(problemId);
      if (selectedId === problemId) {
        setSelectedId(null);
        setForm(emptyProblem);
      }
      await loadData();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const toggleUserAdmin = async (user) => {
    setSaving(true);
    try {
      await apiSetUserAdmin(user.id, !user.isAdmin);
      await loadData();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-purple-900 dark:text-white">הגדרות מנהל</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">ניהול שאלות ותשובות צפויות, וגם הענקת או הסרת הרשאות מנהל למשתמשים.</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <section className="bg-purple-50 dark:bg-gray-800 rounded-xl border border-purple-200 dark:border-gray-700 p-6 space-y-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">שאלות</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">הוספה, עריכה ומחיקה של שאלות עם תשובות צפויות מוסתרות.</p>
          </div>
          <button onClick={() => { setSelectedId(null); setForm(emptyProblem); }} className="btn-outline text-sm">שאלה חדשה</button>
        </div>

        {loading ? (
          <div className="py-8 text-center text-gray-500">טוען...</div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="space-y-3 max-h-[70vh] overflow-auto pr-1">
              {problems.map((problem) => (
                <div key={problem.id} className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl p-4 flex items-start justify-between gap-4">
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">{problem.id}. {problem.title}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{problem.topic} • {problem.difficulty} • {problem.functionName}</div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button onClick={() => handleEdit(problem)} className="btn-outline text-xs">עריכה</button>
                    <button onClick={() => handleDelete(problem.id)} className="border border-red-200 text-red-600 px-3 py-2 rounded-lg text-xs">מחיקה</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl p-4 space-y-3 max-h-[70vh] overflow-auto">
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  ['title', 'כותרת'],
                  ['titleHe', 'כותרת בעברית'],
                  ['topic', 'נושא'],
                  ['difficulty', 'רמת קושי'],
                  ['acceptance', 'אחוז הצלחה'],
                  ['functionName', 'שם הפונקציה'],
                ].map(([key, label]) => (
                  <label key={key} className="block text-sm">
                    <span className="block mb-1 text-gray-600 dark:text-gray-300">{label}</span>
                    <input value={form[key]} onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))} className="w-full" />
                  </label>
                ))}
              </div>

              <label className="block text-sm">
                <span className="block mb-1 text-gray-600 dark:text-gray-300">חברות, מופרדות בפסיקים</span>
                <input value={form.companies} onChange={(e) => setForm((f) => ({ ...f, companies: e.target.value }))} className="w-full" />
              </label>

              <label className="block text-sm">
                <span className="block mb-1 text-gray-600 dark:text-gray-300">תיאור בעברית</span>
                <textarea value={form.descriptionHe} onChange={(e) => setForm((f) => ({ ...f, descriptionHe: e.target.value }))} rows={4} className="w-full" />
              </label>

              <label className="block text-sm">
                <span className="block mb-1 text-gray-600 dark:text-gray-300">מגבלות, שורה אחת לכל מגבלה</span>
                <textarea value={form.constraintsText} onChange={(e) => setForm((f) => ({ ...f, constraintsText: e.target.value }))} rows={4} className="w-full" />
              </label>

              <label className="block text-sm">
                <span className="block mb-1 text-gray-600 dark:text-gray-300">קוד התחלתי - Python</span>
                <textarea value={form.starterCodePython} onChange={(e) => setForm((f) => ({ ...f, starterCodePython: e.target.value }))} rows={4} className="w-full font-mono text-sm" />
              </label>

              <label className="block text-sm">
                <span className="block mb-1 text-gray-600 dark:text-gray-300">דוגמאות JSON</span>
                <textarea value={form.examplesJson} onChange={(e) => setForm((f) => ({ ...f, examplesJson: e.target.value }))} rows={4} className="w-full font-mono text-sm" />
              </label>

              <label className="block text-sm">
                <span className="block mb-1 text-gray-600 dark:text-gray-300">רמזים JSON</span>
                <textarea value={form.hintsJson} onChange={(e) => setForm((f) => ({ ...f, hintsJson: e.target.value }))} rows={4} className="w-full font-mono text-sm" />
              </label>

              <label className="block text-sm">
                <span className="block mb-1 text-gray-600 dark:text-gray-300">תשובות צפויות / מקרי בדיקה JSON</span>
                <textarea value={form.testCasesJson} onChange={(e) => setForm((f) => ({ ...f, testCasesJson: e.target.value }))} rows={6} className="w-full font-mono text-sm" />
              </label>

              <div className="flex gap-3">
                <button disabled={saving} onClick={handleSave} className="btn-primary">
                  {saving ? 'שומר...' : selectedId ? 'עדכון שאלה' : 'יצירת שאלה'}
                </button>
                <button onClick={() => { setSelectedId(null); setForm(emptyProblem); }} className="btn-outline">איפוס</button>
              </div>
            </div>
          </div>
        )}
      </section>

      <section className="bg-purple-50 dark:bg-gray-800 rounded-xl border border-purple-200 dark:border-gray-700 p-6 space-y-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">משתמשים</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">הענקת הרשאות מנהל או הסרתן.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-right text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                <th className="py-2">שם</th>
                <th className="py-2">אימייל</th>
                <th className="py-2">תאריך הצטרפות</th>
                <th className="py-2">מנהל</th>
                <th className="py-2"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-gray-100 dark:border-gray-700">
                  <td className="py-3">{user.name}</td>
                  <td className="py-3">{user.email}</td>
                  <td className="py-3">{user.joinDate}</td>
                  <td className="py-3">{user.isAdmin ? 'כן' : 'לא'}</td>
                  <td className="py-3 text-left">
                    <button onClick={() => toggleUserAdmin(user)} className="btn-outline text-xs">
                      {user.isAdmin ? 'הסר מנהל' : 'הפוך למנהל'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
