'use client';

import { useRouter } from 'next/navigation';
import { DIFFICULTY_MAP, STATUS_MAP } from '@/data/fakeData';

export default function ProblemRow({ problem, isAdmin = false, onTogglePublish, onEdit, onDelete, isSaving = false, publishLabels, adminLabels }) {
  const router = useRouter();
  const diff = DIFFICULTY_MAP[problem.difficulty];
  const status = STATUS_MAP[problem.status];
  const isPublished = problem.published !== false;

  const handleToggle = (e) => {
    e.stopPropagation();
    if (!onTogglePublish || isSaving) return;
    onTogglePublish(problem);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit?.(problem);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (isSaving) return;
    onDelete?.(problem);
  };

  return (
    <tr
      className="hover:bg-purple-50 dark:hover:bg-purple-900/20 cursor-pointer transition-colors border-b border-gray-100 dark:border-gray-700/50 last:border-0"
      onClick={() => router.push(`/session/${problem.id}`)}
    >
      <td className="px-3 sm:px-6 py-4 hidden sm:table-cell"><i className={status.icon}></i></td>
      <td className="px-3 sm:px-6 py-4">
        <div className="font-medium text-gray-900 dark:text-gray-100 truncate max-w-[150px] sm:max-w-[240px] lg:max-w-[320px]">{problem.id}. {problem.title}</div>
      </td>
      <td className="px-3 sm:px-6 py-4 hidden md:table-cell">
        <span className="text-sm text-gray-500 dark:text-gray-400">{problem.topic}</span>
      </td>
      <td className="px-3 sm:px-6 py-4">
        <span className={`text-sm font-medium ${diff.class}`}>{diff.label}</span>
      </td>
      <td className="px-3 sm:px-6 py-4 hidden lg:table-cell">
        <div className="flex items-center gap-2">
          <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
            <div className="bg-primary rounded-full h-1.5" style={{ width: `${problem.acceptance}%` }}></div>
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">{problem.acceptance}%</span>
        </div>
      </td>
      <td className="px-3 sm:px-6 py-4 hidden lg:table-cell">
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
        <td className="px-3 sm:px-4 py-4">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              role="switch"
              aria-checked={isPublished}
              onClick={handleToggle}
              disabled={isSaving}
              dir="ltr"
              title={isPublished ? publishLabels?.on : publishLabels?.off}
              className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors disabled:opacity-50 ${
                isPublished ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${
                  isPublished ? 'translate-x-4' : 'translate-x-1'
                }`}
              />
            </button>
            <span
              className={`hidden lg:inline text-xs font-medium ${
                isPublished ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'
              }`}
            >
              {isSaving ? publishLabels?.saving : isPublished ? publishLabels?.on : publishLabels?.off}
            </span>
            <button
              type="button"
              onClick={handleEdit}
              title={adminLabels?.editAction}
              aria-label={adminLabels?.editAction}
              className="text-xs text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <i className="fas fa-pen"></i>
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={isSaving}
              title={adminLabels?.deleteAction}
              aria-label={adminLabels?.deleteAction}
              className="text-xs text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors disabled:opacity-50"
            >
              <i className="fas fa-trash"></i>
            </button>
          </div>
        </td>
      )}
    </tr>
  );
}
