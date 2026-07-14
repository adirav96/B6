'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ProblemRow from '@/components/ProblemRow';
import ProblemFormModal from '@/components/ProblemFormModal';
import { useApp } from '@/context/AppContext';
import { PROBLEMS_CONTENT } from '@/content/problemsContent';

function getStatus(problemId, solutions, session) {
  const sol = solutions[problemId];
  if (sol) return sol.score >= 50 ? 'completed' : 'failed';
  if (session?.problemId === problemId) return 'in-progress';
  return 'not-started';
}

export default function Problems() {
  const { solutions, session, problems: dbProblems, isAdmin, createProblem, updateProblem, deleteProblem } = useApp();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState('');
  const [topicFilter, setTopicFilter] = useState(searchParams.get('topic') || '');
  const [difficultyFilter, setDifficultyFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [savingMap, setSavingMap] = useState({});
  const [feedback, setFeedback] = useState('');
  // null = closed; { mode: 'create' } or { mode: 'edit', problem }
  const [editor, setEditor] = useState(null);

  const problems = dbProblems.map(p => ({
    ...p,
    status: getStatus(p.id, solutions, session),
  }));

  const filtered = problems.filter(p => {
    if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (topicFilter && p.topic !== topicFilter) return false;
    if (difficultyFilter && p.difficulty !== difficultyFilter) return false;
    if (statusFilter && p.status !== statusFilter) return false;
    return true;
  });

  const topics = [...new Set(dbProblems.map(p => p.topic))];

  const handleTogglePublish = async (problem) => {
    setFeedback('');
    setSavingMap((prev) => ({ ...prev, [problem.id]: true }));
    const result = await updateProblem(problem.id, { published: !(problem.published !== false) });
    setSavingMap((prev) => ({ ...prev, [problem.id]: false }));
    if (result.success) {
      setFeedback(PROBLEMS_CONTENT.publish.success);
    } else {
      setFeedback(result.error || PROBLEMS_CONTENT.publish.error);
    }
  };

  const handleSubmitProblem = async (payload) => {
    setFeedback('');
    if (editor?.mode === 'edit') {
      const result = await updateProblem(payload.id, payload);
      if (result.success) setFeedback(PROBLEMS_CONTENT.admin.updateSuccess);
      return result;
    }
    const result = await createProblem(payload);
    if (result.success) setFeedback(PROBLEMS_CONTENT.admin.createSuccess);
    return result;
  };

  const handleDelete = async (problem) => {
    if (!window.confirm(PROBLEMS_CONTENT.admin.deleteConfirm(problem.title))) return;
    setFeedback('');
    setSavingMap((prev) => ({ ...prev, [problem.id]: true }));
    const result = await deleteProblem(problem.id);
    setSavingMap((prev) => ({ ...prev, [problem.id]: false }));
    setFeedback(result.success ? PROBLEMS_CONTENT.admin.deleteSuccess : (result.error || PROBLEMS_CONTENT.admin.deleteError));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-purple-900 dark:text-white">{PROBLEMS_CONTENT.title}</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">{PROBLEMS_CONTENT.subtitle(dbProblems.length)}</p>
        </div>
        <div className="flex items-center gap-3">
          {isAdmin && (
            <button
              type="button"
              onClick={() => setEditor({ mode: 'create' })}
              className="whitespace-nowrap inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors"
            >
              <i className="fas fa-plus"></i>
              {PROBLEMS_CONTENT.admin.addButton}
            </button>
          )}
          <div className="relative">
            <input
              type="text"
              placeholder={PROBLEMS_CONTENT.searchPlaceholder}
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="bg-white dark:bg-gray-700 border border-purple-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-lg pr-10 pl-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-full md:w-64"
            />
            <i className="fas fa-search absolute right-3 top-3 text-gray-400 text-sm"></i>
          </div>
        </div>
      </div>

      <div className="bg-purple-50 dark:bg-gray-800 rounded-xl shadow-sm border border-purple-200 dark:border-gray-700 p-4 mb-6">
        <div className="flex flex-wrap gap-3">
          <select value={topicFilter} onChange={e => setTopicFilter(e.target.value)} className="border border-purple-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
            <option value="">{PROBLEMS_CONTENT.filters.topicAll}</option>
            {topics.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <select value={difficultyFilter} onChange={e => setDifficultyFilter(e.target.value)} className="border border-purple-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
            <option value="">{PROBLEMS_CONTENT.filters.difficultyAll}</option>
            <option value="easy">{PROBLEMS_CONTENT.filters.difficulty.easy}</option>
            <option value="medium">{PROBLEMS_CONTENT.filters.difficulty.medium}</option>
            <option value="hard">{PROBLEMS_CONTENT.filters.difficulty.hard}</option>
          </select>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="border border-purple-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
            <option value="">{PROBLEMS_CONTENT.filters.statusAll}</option>
            <option value="completed">{PROBLEMS_CONTENT.filters.status.completed}</option>
            <option value="failed">{PROBLEMS_CONTENT.filters.status.failed}</option>
            <option value="in-progress">{PROBLEMS_CONTENT.filters.status.inProgress}</option>
            <option value="not-started">{PROBLEMS_CONTENT.filters.status.notStarted}</option>
          </select>
        </div>
      </div>

      {feedback && (
        <div className="mb-4 rounded-lg border border-purple-200 dark:border-gray-700 bg-purple-50 dark:bg-gray-800 px-4 py-3 text-sm text-gray-700 dark:text-gray-200">
          {feedback}
        </div>
      )}

      <div className="bg-purple-50 dark:bg-gray-800 rounded-xl shadow-sm border border-purple-200 dark:border-gray-700 overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700/60 border-b border-purple-200 dark:border-gray-700">
            <tr>
              <th className="text-right px-3 sm:px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase hidden sm:table-cell">{PROBLEMS_CONTENT.tableHeaders.status}</th>
              <th className="text-right px-3 sm:px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">{PROBLEMS_CONTENT.tableHeaders.question}</th>
              <th className="text-right px-3 sm:px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase hidden md:table-cell">{PROBLEMS_CONTENT.tableHeaders.topic}</th>
              <th className="text-right px-3 sm:px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">{PROBLEMS_CONTENT.tableHeaders.level}</th>
              <th className="text-right px-3 sm:px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase hidden lg:table-cell">{PROBLEMS_CONTENT.tableHeaders.acceptance}</th>
              <th className="text-right px-3 sm:px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase hidden lg:table-cell">{PROBLEMS_CONTENT.tableHeaders.companies}</th>
              {isAdmin && <th className="text-right px-3 sm:px-4 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">{PROBLEMS_CONTENT.admin.actionsHeader}</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map(problem => (
              <ProblemRow
                key={problem.id}
                problem={problem}
                isAdmin={isAdmin}
                onTogglePublish={handleTogglePublish}
                onEdit={(p) => setEditor({ mode: 'edit', problem: p })}
                onDelete={handleDelete}
                isSaving={!!savingMap[problem.id]}
                publishLabels={PROBLEMS_CONTENT.publish}
                adminLabels={PROBLEMS_CONTENT.admin}
              />
            ))}
          </tbody>
        </table>
      </div>

      {editor && (
        <ProblemFormModal
          mode={editor.mode}
          problem={editor.mode === 'edit' ? editor.problem : null}
          onClose={() => setEditor(null)}
          onSubmit={handleSubmitProblem}
        />
      )}
    </div>
  );
}
