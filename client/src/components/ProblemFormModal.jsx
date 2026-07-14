'use client';

import { useState, useEffect } from 'react';
import { PROBLEMS_CONTENT } from '@/content/problemsContent';

const F = PROBLEMS_CONTENT.form;

// convert a stored problem into flat form values (arrays -> text)
function toFormValues(problem) {
  return {
    id: problem?.id ?? '',
    title: problem?.title ?? '',
    titleHe: problem?.titleHe ?? '',
    topic: problem?.topic ?? '',
    difficulty: problem?.difficulty ?? 'easy',
    functionName: problem?.functionName ?? '',
    companies: (problem?.companies ?? []).join(', '),
    descriptionHe: problem?.descriptionHe ?? '',
    constraints: (problem?.constraints ?? []).join('\n'),
    hints: (problem?.hints ?? []).join('\n'),
    starterCode: problem?.starterCode?.python ?? '',
    examples: JSON.stringify(problem?.examples ?? [], null, 2),
    testCases: JSON.stringify(problem?.testCases ?? [], null, 2),
    published: problem?.published !== false,
  };
}

const inputClass =
  'w-full border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary';
const labelClass = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1';

export default function ProblemFormModal({ mode, problem, onClose, onSubmit }) {
  const [values, setValues] = useState(() => toFormValues(problem));
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const isEdit = mode === 'edit';

  // reset the form whenever a different problem is opened
  useEffect(() => {
    setValues(toFormValues(problem));
    setError('');
  }, [problem]);

  // close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const set = (key) => (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setValues((v) => ({ ...v, [key]: val }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!String(values.id).trim() || !values.title.trim() || !values.titleHe.trim()) {
      setError(F.required);
      return;
    }

    let examples, testCases;
    try {
      examples = JSON.parse(values.examples || '[]');
      if (!Array.isArray(examples)) throw new Error();
    } catch {
      setError(F.invalidExamples);
      return;
    }
    try {
      testCases = JSON.parse(values.testCases || '[]');
      if (!Array.isArray(testCases)) throw new Error();
    } catch {
      setError(F.invalidTestCases);
      return;
    }

    const payload = {
      id: Number(values.id),
      title: values.title.trim(),
      titleHe: values.titleHe.trim(),
      topic: values.topic.trim(),
      difficulty: values.difficulty,
      functionName: values.functionName.trim(),
      companies: values.companies.split(',').map((s) => s.trim()).filter(Boolean),
      descriptionHe: values.descriptionHe,
      constraints: values.constraints.split('\n').map((s) => s.trim()).filter(Boolean),
      hints: values.hints.split('\n').map((s) => s.trim()).filter(Boolean),
      starterCode: { python: values.starterCode },
      examples,
      testCases,
      published: values.published,
    };

    setSaving(true);
    const result = await onSubmit(payload);
    setSaving(false);
    if (result?.success) onClose();
    else setError(result?.error || 'שגיאה');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 rounded-t-2xl">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            {isEdit ? F.editTitle : F.createTitle}
          </h2>
          <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
            <i className="fas fa-times text-lg"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>{F.fields.id}</label>
              <input type="number" value={values.id} onChange={set('id')} disabled={isEdit} className={`${inputClass} disabled:opacity-60 disabled:cursor-not-allowed`} />
            </div>
            <div>
              <label className={labelClass}>{F.fields.difficulty}</label>
              <select value={values.difficulty} onChange={set('difficulty')} className={inputClass}>
                <option value="easy">{F.difficulty.easy}</option>
                <option value="medium">{F.difficulty.medium}</option>
                <option value="hard">{F.difficulty.hard}</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>{F.fields.title}</label>
              <input type="text" value={values.title} onChange={set('title')} dir="ltr" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>{F.fields.titleHe}</label>
              <input type="text" value={values.titleHe} onChange={set('titleHe')} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>{F.fields.topic}</label>
              <input type="text" value={values.topic} onChange={set('topic')} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>{F.fields.functionName}</label>
              <input type="text" value={values.functionName} onChange={set('functionName')} dir="ltr" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>{F.fields.companies}</label>
              <input type="text" value={values.companies} onChange={set('companies')} className={inputClass} />
            </div>
          </div>

          <div>
            <label className={labelClass}>{F.fields.descriptionHe}</label>
            <textarea value={values.descriptionHe} onChange={set('descriptionHe')} rows={3} className={inputClass} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>{F.fields.constraints}</label>
              <textarea value={values.constraints} onChange={set('constraints')} rows={3} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>{F.fields.hints}</label>
              <textarea value={values.hints} onChange={set('hints')} rows={3} className={inputClass} />
            </div>
          </div>

          <div>
            <label className={labelClass}>{F.fields.starterCode}</label>
            <textarea value={values.starterCode} onChange={set('starterCode')} rows={4} dir="ltr" className={`${inputClass} font-mono`} />
          </div>

          <div>
            <label className={labelClass}>{F.fields.examples}</label>
            <textarea value={values.examples} onChange={set('examples')} rows={4} dir="ltr" placeholder={F.examplesHint} className={`${inputClass} font-mono`} />
          </div>

          <div>
            <label className={labelClass}>{F.fields.testCases}</label>
            <textarea value={values.testCases} onChange={set('testCases')} rows={4} dir="ltr" placeholder={F.testCasesHint} className={`${inputClass} font-mono`} />
          </div>

          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input type="checkbox" checked={values.published} onChange={set('published')} className="w-4 h-4 accent-primary" />
            <span className="text-sm text-gray-700 dark:text-gray-300">{F.fields.published}</span>
          </label>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving} className="flex-1 bg-primary hover:bg-primary-dark text-white font-medium py-2.5 rounded-lg transition-colors disabled:opacity-50">
              {saving ? F.saving : F.save}
            </button>
            <button type="button" onClick={onClose} className="px-6 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              {F.cancel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
