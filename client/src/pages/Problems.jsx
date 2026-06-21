'use client';

import { useState } from 'react';
import ProblemRow from '@/components/ProblemRow';
import { PROBLEMS_DATA } from '@/data/problemsData';
import { useApp } from '@/context/AppContext';

function getStatus(problemId, solutions, session) {
  const sol = solutions[problemId];
  if (sol) return sol.score >= 50 ? 'completed' : 'failed';
  if (session?.problemId === problemId) return 'in-progress';
  return 'not-started';
}

export default function Problems() {
  const { solutions, session } = useApp();
  const [search, setSearch] = useState('');
  const [topicFilter, setTopicFilter] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const problems = PROBLEMS_DATA.map(p => ({
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

  const topics = [...new Set(PROBLEMS_DATA.map(p => p.topic))];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">בנק שאלות</h1>
          <p className="text-gray-500 mt-1">{PROBLEMS_DATA.length}+ שאלות בנושאי קידוד נפוצים בראיונות</p>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="חיפוש שאלה..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-white border border-gray-200 rounded-lg pr-10 pl-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-64"
          />
          <i className="fas fa-search absolute right-3 top-3 text-gray-400 text-sm"></i>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex flex-wrap gap-3">
          <select value={topicFilter} onChange={e => setTopicFilter(e.target.value)} className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
            <option value="">כל הנושאים</option>
            {topics.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <select value={difficultyFilter} onChange={e => setDifficultyFilter(e.target.value)} className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
            <option value="">כל הרמות</option>
            <option value="easy">קל</option>
            <option value="medium">בינוני</option>
            <option value="hard">קשה</option>
          </select>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
            <option value="">כל הסטטוסים</option>
            <option value="completed">הושלם</option>
            <option value="failed">לא עבר</option>
            <option value="in-progress">בתהליך</option>
            <option value="not-started">לא התחיל</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase">סטטוס</th>
              <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase">שאלה</th>
              <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">נושא</th>
              <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase">רמה</th>
              <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase hidden lg:table-cell">אחוז הצלחה</th>
              <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase hidden lg:table-cell">חברות</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map(problem => (
              <ProblemRow key={problem.id} problem={problem} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
