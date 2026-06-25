import { useMemo } from 'react';

export default function ActivityGrid({ activityLog = [], count = 28 }) {
  const colors = ['bg-gray-200 dark:bg-gray-600', 'bg-green-200 dark:bg-green-800', 'bg-green-400 dark:bg-green-600', 'bg-green-600 dark:bg-green-400'];

  const cells = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const logMap = {};
    for (const entry of activityLog) {
      logMap[entry.date] = entry.count;
    }

    return Array.from({ length: count }, (_, i) => {
      const date = new Date(today);
      date.setDate(date.getDate() - (count - 1 - i));
      const dateStr = date.toISOString().slice(0, 10);
      const dayCount = logMap[dateStr] ?? 0;
      const level = Math.min(dayCount, 3);

      const formatted = date.toLocaleDateString('he-IL', { day: 'numeric', month: 'short' });

      return { id: i, color: colors[level], level: dayCount, dateLabel: formatted };
    });
  }, [activityLog, count]);

  return (
    <div>
      <div className="grid grid-cols-7 gap-1.5">
        {cells.map(cell => (
          <div
            key={cell.id}
            className={`w-full aspect-square rounded-sm ${cell.color}`}
            title={`${cell.dateLabel} — ${cell.level} שאלות`}
          />
        ))}
      </div>
      <div className="flex items-center justify-between mt-4 text-xs text-gray-400">
        <span>פחות</span>
        <div className="flex gap-1">
          {colors.map((c, i) => (
            <div key={i} className={`w-3 h-3 rounded-sm ${c}`}></div>
          ))}
        </div>
        <span>יותר</span>
      </div>
    </div>
  );
}
