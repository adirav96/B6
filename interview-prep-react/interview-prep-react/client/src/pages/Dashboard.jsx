import { useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import StatsCard from '../components/StatsCard';
import { useApp } from '../context/AppContext';
import { PROBLEMS_DATA } from '../data/problemsData';
import { DIFFICULTY_MAP } from '../data/fakeData';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, solutions, getStats, getRecentActivity, getTopicMastery } = useApp();

  const stats = getStats();
  const recentActivity = getRecentActivity(PROBLEMS_DATA, 4);
  const weakTopics = useMemo(() => {
    return getTopicMastery(PROBLEMS_DATA)
      .sort((a, b) => a.percent - b.percent)
      .slice(0, 3);
  }, [getTopicMastery]);

  const weeklyCount = useMemo(() => {
    const now = new Date();
    const day = now.getDay();
    const sunday = new Date(now);
    sunday.setDate(now.getDate() - day);
    sunday.setHours(0, 0, 0, 0);

    return Object.values(solutions).filter(s => {
      if (!s.date) return false;
      return new Date(s.date) >= sunday;
    }).length;
  }, [solutions]);

  const weeklyGoal = 10;
  const weeklyPercent = Math.min(Math.round((weeklyCount / weeklyGoal) * 100), 100);
  const remaining = Math.max(weeklyGoal - weeklyCount, 0);

  function getActivityStyle(score) {
    if (score >= 80) return { icon: 'fas fa-check', iconBg: 'bg-green-100', iconColor: 'text-green-600', badgeBg: 'bg-green-100', badgeColor: 'text-green-700', statusLabel: `הושלם - ${score}%` };
    if (score >= 50) return { icon: 'fas fa-clock', iconBg: 'bg-amber-100', iconColor: 'text-amber-600', badgeBg: 'bg-amber-100', badgeColor: 'text-amber-700', statusLabel: 'בתהליך' };
    return { icon: 'fas fa-times', iconBg: 'bg-red-100', iconColor: 'text-red-600', badgeBg: 'bg-red-100', badgeColor: 'text-red-700', statusLabel: `הושלם - ${score}%` };
  }

  function getTopicStyle(percent) {
    if (percent < 40) return { bg: 'bg-red-50', icon: 'fas fa-exclamation-triangle', iconColor: 'text-red-500' };
    if (percent < 60) return { bg: 'bg-amber-50', icon: 'fas fa-exclamation-circle', iconColor: 'text-amber-500' };
    return { bg: 'bg-blue-50', icon: 'fas fa-info-circle', iconColor: 'text-blue-500' };
  }

  const firstName = user.name.split(' ')[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">שלום, {firstName}! 👋</h1>
        <p className="text-gray-500 mt-1">מוכן לתרגל היום? {stats.totalSolved > 0 ? `כבר פתרת ${stats.totalSolved} שאלות!` : 'בוא נתחיל לתרגל!'}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatsCard icon="fas fa-check-circle text-green-600" iconBg="bg-green-100" value={String(stats.totalSolved)} label="שאלות שנפתרו" />
        <StatsCard icon="fas fa-fire text-blue-600" iconBg="bg-blue-100" value={String(stats.currentStreak)} label="ימים ברצף" badge={stats.currentStreak >= 3 ? 'רצף!' : undefined} badgeColor="text-blue-600 bg-blue-50" />
        <StatsCard icon="fas fa-clock text-purple-600" iconBg="bg-purple-100" value={stats.avgTime} label="זמן ממוצע לפתרון" />
        <StatsCard icon="fas fa-star text-amber-600" iconBg="bg-amber-100" value={stats.totalSolved > 0 ? `${stats.avgScore}%` : '—'} label="ציון ממוצע" />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">המשך מאיפה שהפסקת</h2>
            </div>
            <div className="divide-y divide-gray-50">
              {recentActivity.length > 0 ? (
                recentActivity.map((item) => {
                  const style = getActivityStyle(item.score);
                  return (
                    <div key={item.id} className="p-6 hover:bg-gray-50 cursor-pointer transition-colors" onClick={() => navigate(`/session/${item.id}`)}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`${style.iconBg} p-3 rounded-lg`}>
                            <i className={`${style.icon} ${style.iconColor}`}></i>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{item.title}</h3>
                            <p className="text-sm text-gray-500">
                              {item.topic} • <span className={`${DIFFICULTY_MAP[item.difficulty].class} font-medium`}>{DIFFICULTY_MAP[item.difficulty].label}</span>
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`text-xs ${style.badgeBg} ${style.badgeColor} px-3 py-1 rounded-full font-medium`}>{style.statusLabel}</span>
                          <i className="fas fa-chevron-left text-gray-400"></i>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-10 text-center">
                  <div className="text-4xl mb-3">🚀</div>
                  <h3 className="font-semibold text-gray-900 mb-2">עוד לא התחלת? בוא נתחיל!</h3>
                  <p className="text-sm text-gray-500 mb-4">בחר שאלה מהרשימה והתחל לתרגל</p>
                  <Link to="/problems" className="inline-flex items-center gap-2 bg-primary text-white font-medium py-2 px-5 rounded-lg text-sm hover:bg-indigo-700 transition-colors">
                    <i className="fas fa-list"></i>
                    לרשימת השאלות
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4">יעד שבועי</h3>
            <div className="flex items-center gap-3 mb-3">
              <div className="flex-1 bg-gray-200 rounded-full h-3">
                <div className="bg-primary rounded-full h-3" style={{ width: `${weeklyPercent}%` }}></div>
              </div>
              <span className="text-sm font-bold text-primary">{weeklyCount}/{weeklyGoal}</span>
            </div>
            <p className="text-sm text-gray-500">
              {remaining > 0 ? `עוד ${remaining} שאלות להשלמת היעד השבועי` : 'כל הכבוד! השלמת את היעד השבועי 🎉'}
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4">מומלץ לתרגל</h3>
            <div className="space-y-3">
              {weakTopics.map((topic, idx) => {
                const style = getTopicStyle(topic.percent);
                return (
                  <div key={idx} className={`flex items-center gap-3 p-3 ${style.bg} rounded-lg`}>
                    <i className={`${style.icon} ${style.iconColor}`}></i>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{topic.topic}</div>
                      <div className="text-xs text-gray-500">אחוז הצלחה: {topic.percent}%</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary to-purple-600 rounded-xl p-6 text-white">
            <h3 className="font-bold mb-3">ראיון מתוזמן</h3>
            <p className="text-indigo-100 text-sm mb-4">סימולציית ראיון מלאה - 45 דקות</p>
            <div className="flex items-center gap-2 text-sm text-indigo-200 mb-4">
              <i className="fas fa-calendar"></i>
              <span>יום רביעי, 21.05 בשעה 18:00</span>
            </div>
            <button className="bg-white/20 hover:bg-white/30 text-white font-medium py-2 px-4 rounded-lg text-sm transition-all w-full">
              הכנה לראיון
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
