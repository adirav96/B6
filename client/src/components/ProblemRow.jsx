'use client';

import { useRouter } from 'next/navigation';
import { DIFFICULTY_MAP, STATUS_MAP } from '@/data/fakeData';

export default function ProblemRow({ problem, isAdmin = false, onTogglePublish, isSaving = false, publishLabels }) {
  const router = useRouter();
  const diff = DIFFICULTY_MAP[problem.difficulty];
  const status = STATUS_MAP[problem.status];
  const isPublished = problem.published !== false;

  const handleToggle = (e) => {
    e.stopPropagation();
    if (!onTogglePublish || isSaving) return;
    onTogglePublish(problem);
  };

  return (
    <tr
      className="hover:bg-purple-50 dark:hover:bg-purple-900/20 cursor-pointer transition-colors border-b border-gray-100 dark:border-gray-700/50 last:border-0"
      onClick={() => router.push(`/session/${problem.id}`)}
    >
      <td className="px-6 py-4"><i className={status.icon}></i></td>
      <td className="px-6 py-4">
        <div className="font-medium text-gray-900 dark:text-gray-100 truncate max-w-[220px] sm:max-w-[280px] md:max-w-none">{problem.id}. {problem.title}</div>
      </td>
      <td className="px-6 py-4 hidden md:table-cell">
        <span className="text-sm text-gray-500 dark:text-gray-400">{problem.topic}</span>
      </td>
      <td className="px-6 py-4">
        <span className={`text-sm font-medium ${diff.class}`}>{diff.label}</span>
      </td>
      <td className="px-6 py-4 hidden lg:table-cell">
        <div className="flex items-center gap-2">
          <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
            <div className="bg-primary rounded-full h-1.5" style={{ width: `${problem.acceptance}%` }}></div>
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">{problem.acceptance}%</span>
        </div>
      </td>
      <td className="px-6 py-4 hidden lg:table-cell">
        <div className="flex gap-1">
          {problem.companies.slice(0, 2).map((c) => (
            <span key={c} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded">{c}</span>
          ))}
          {problem.companies.length > 2 && (
            <span className="text-xs text-gray-400">+{problem.companies.length - 2}</span>
          )}
        </div>
      </td>
      {isAdmin && (
        <td className="px-6 py-4">
          <div className="flex items-center gap-2">
            <span
              className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                isPublished
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                  : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
              }`}
            >
              {isPublished ? publishLabels?.on : publishLabels?.off}
            </span>
            <button
              type="button"
              onClick={handleToggle}
              disabled={isSaving}
              className="text-xs bg-primary hover:bg-primary-dark text-white px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
            >
              {isSaving ? publishLabels?.saving : publishLabels?.save}
            </button>
          </div>
        </td>
      )}
    </tr>
  );
}
