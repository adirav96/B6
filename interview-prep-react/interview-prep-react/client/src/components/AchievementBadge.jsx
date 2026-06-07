export default function AchievementBadge({ emoji, title, bg, border, locked }) {
  return (
    <div className={`text-center p-3 ${bg} rounded-xl border ${border} ${locked ? 'opacity-50' : ''}`}>
      <div className="text-2xl mb-1">{emoji}</div>
      <div className={`text-xs font-medium ${locked ? 'text-gray-400' : 'text-gray-700'}`}>{title}</div>
    </div>
  );
}
