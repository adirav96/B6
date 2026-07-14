export default function StatsCard({ icon, iconBg, value, label, badge, badgeColor }) {
  return (
    <div className="bg-purple-50 dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-sm border border-purple-200 dark:border-gray-700 min-w-0">
      <div className="flex items-center justify-between mb-4">
        <div className={`${iconBg} p-3 rounded-lg`}>
          <i className={`${icon} text-xl`}></i>
        </div>
        {badge && (
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${badgeColor}`}>
            {badge}
          </span>
        )}
      </div>
      <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white truncate">{value}</div>
      <div className="text-sm text-gray-500 dark:text-gray-400">{label}</div>
    </div>
  );
}
