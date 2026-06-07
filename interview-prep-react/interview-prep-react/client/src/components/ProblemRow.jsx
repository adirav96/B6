import { useNavigate } from 'react-router-dom';
import { DIFFICULTY_MAP, STATUS_MAP } from '../data/fakeData';

export default function ProblemRow({ problem }) {
  const navigate = useNavigate();
  const diff = DIFFICULTY_MAP[problem.difficulty];
  const status = STATUS_MAP[problem.status];

  return (
    <tr
      className="hover:bg-gray-50 cursor-pointer transition-colors"
      onClick={() => navigate(`/session/${problem.id}`)}
    >
      <td className="px-6 py-4"><i className={status.icon}></i></td>
      <td className="px-6 py-4">
        <div className="font-medium text-gray-900">{problem.id}. {problem.title}</div>
      </td>
      <td className="px-6 py-4 hidden md:table-cell">
        <span className="text-sm text-gray-500">{problem.topic}</span>
      </td>
      <td className="px-6 py-4">
        <span className={`text-sm font-medium ${diff.class}`}>{diff.label}</span>
      </td>
      <td className="px-6 py-4 hidden lg:table-cell">
        <div className="flex items-center gap-2">
          <div className="w-16 bg-gray-200 rounded-full h-1.5">
            <div className="bg-primary rounded-full h-1.5" style={{ width: `${problem.acceptance}%` }}></div>
          </div>
          <span className="text-xs text-gray-500">{problem.acceptance}%</span>
        </div>
      </td>
      <td className="px-6 py-4 hidden lg:table-cell">
        <div className="flex gap-1">
          {problem.companies.slice(0, 2).map(c => (
            <span key={c} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{c}</span>
          ))}
          {problem.companies.length > 2 && (
            <span className="text-xs text-gray-400">+{problem.companies.length - 2}</span>
          )}
        </div>
      </td>
    </tr>
  );
}
