'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import StatsCard from '@/components/StatsCard';
import { useApp } from '@/context/AppContext';
import { DIFFICULTY_MAP } from '@/data/fakeData';
import { DASHBOARD_CONTENT } from '@/content/dashboardContent';

export default function Dashboard() {
  const router = useRouter();
  const { user, solutions, problems, getStats, getRecentActivity, getTopicMastery } = useApp();

  const stats = getStats();
  const recentActivity = getRecentActivity(problems, 4);
  const weakTopics = useMemo(() => {
    return getTopicMastery(problems)
      .sort((a, b) => a.percent - b.percent)
      .slice(0, 3);
  }, [getTopicMastery, problems]);

  // count solutions submitted since the start of the current week (Sunday midnight)
  const weeklyCount = useMemo(() => {
    const now = new Date();
    const day = now.getDay();
    const sunday = new Date(now);
    sunday.setDate(now.getDate() - day);
    sunday.setHours(0, 0, 0, 0);
    return Object.values(solutions).filter(s => s.date && new Date(s.date) >= sunday).length;
  }, [solutions]);

  const weeklyGoal = 10;
  const weeklyPercent = Math.min(Math.round((weeklyCount / weeklyGoal) * 100), 100);
  const remaining = Math.max(weeklyGoal - weeklyCount, 0);

  function getActivityStyle(score) {
    if (score >= 80) return { icon: 'fas fa-check', iconBg: 'bg-green-100 dark:bg-green-900/30', iconColor: 'text-green-600', badgeBg: 'bg-green-100 dark:bg-green-900/30', badgeColor: 'text-green-700 dark:text-green-400', statusLabel: DASHBOARD_CONTENT.activity.completedWithScore(score) };
    if (score >= 50) return { icon: 'fas fa-clock', iconBg: 'bg-amber-100 dark:bg-amber-900/30', iconColor: 'text-amber-600', badgeBg: 'bg-amber-100 dark:bg-amber-900/30', badgeColor: 'text-amber-700 dark:text-amber-400', statusLabel: DASHBOARD_CONTENT.activity.inProgress };
    return { icon: 'fas fa-times', iconBg: 'bg-red-100 dark:bg-red-900/30', iconColor: 'text-red-600', badgeBg: 'bg-red-100 dark:bg-red-900/30', badgeColor: 'text-red-700 dark:text-red-400', statusLabel: DASHBOARD_CONTENT.activity.completedWithScore(score) };
  }

  function getTopicStyle(percent) {
    if (percent < 40) return { bg: 'bg-red-50 dark:bg-red-900/20', icon: 'fas fa-exclamation-triangle', iconColor: 'text-red-500' };
    if (percent < 60) return { bg: 'bg-amber-50 dark:bg-amber-900/20', icon: 'fas fa-exclamation-circle', iconColor: 'text-amber-500' };
    return { bg: 'bg-blue-50 dark:bg-blue-900/20', icon: 'fas fa-info-circle', iconColor: 'text-blue-500' };
  }

  const firstName = user.name.split(' ')[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-purple-900 dark:text-white">{DASHBOARD_CONTENT.greetingPrefix} {firstName}{DASHBOARD_CONTENT.greetingSuffix}</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">{DASHBOARD_CONTENT.greetingQuestion} {stats.totalSolved > 0 ? DASHBOARD_CONTENT.greetingSolvedMessage(stats.totalSolved) : DASHBOARD_CONTENT.greetingEmptyMessage}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatsCard icon="fas fa-check-circle text-green-600" iconBg="bg-green-100 dark:bg-green-900/30" value={String(stats.totalSolved)} label={DASHBOARD_CONTENT.stats.solved} />
        <StatsCard icon="fas fa-fire text-blue-600" iconBg="bg-blue-100 dark:bg-blue-900/30" value={String(stats.currentStreak)} label={DASHBOARD_CONTENT.stats.streak} badge={stats.currentStreak >= 3 ? DASHBOARD_CONTENT.stats.streakBadge : undefined} badgeColor="text-blue-600 bg-blue-50 dark:bg-blue-900/30" />
        <StatsCard icon="fas fa-clock text-purple-600" iconBg="bg-purple-100 dark:bg-purple-900/30" value={stats.avgTime} label={DASHBOARD_CONTENT.stats.avgTime} />
        <StatsCard icon="fas fa-star text-amber-600" iconBg="bg-amber-100 dark:bg-amber-900/30" value={stats.totalSolved > 0 ? `${stats.avgScore}%` : '—'} label={DASHBOARD_CONTENT.stats.avgScore} />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-purple-50 dark:bg-gray-800 rounded-xl shadow-sm border border-purple-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">{DASHBOARD_CONTENT.resumeTitle}</h2>
            </div>
            <div className="divide-y divide-purple-100 dark:divide-gray-700">
              {recentActivity.length > 0 ? (
                recentActivity.map((item) => {
                  const style = getActivityStyle(item.score);
                  return (
                    <div key={item.id} className="p-4 sm:p-6 hover:bg-purple-100 dark:hover:bg-gray-700/50 cursor-pointer transition-colors" onClick={() => router.push(`/session/${item.id}`)}>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                          <div className={`${style.iconBg} p-3 rounded-lg`}>
                            <i className={`${style.icon} ${style.iconColor}`}></i>
                          </div>
                          <div className="min-w-0">
                            <h3 className="font-semibold text-gray-900 dark:text-white truncate">{item.title}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {item.topic} • <span className={`${DIFFICULTY_MAP[item.difficulty].class} font-medium`}>{DIFFICULTY_MAP[item.difficulty].label}</span>
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3 self-start sm:self-auto">
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
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{DASHBOARD_CONTENT.empty.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{DASHBOARD_CONTENT.empty.subtitle}</p>
                  <Link href="/problems" className="inline-flex items-center gap-2 bg-primary text-white font-medium py-2 px-5 rounded-lg text-sm hover:bg-indigo-700 transition-colors">
                    <i className="fas fa-list"></i>
                    {DASHBOARD_CONTENT.empty.cta}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-purple-50 dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-purple-200 dark:border-gray-700">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">{DASHBOARD_CONTENT.weeklyGoal.title}</h3>
            <div className="flex items-center gap-3 mb-3">
              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div className="bg-primary rounded-full h-3" style={{ width: `${weeklyPercent}%` }}></div>
              </div>
              <span className="text-sm font-bold text-primary">{weeklyCount}/{weeklyGoal}</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {remaining > 0 ? DASHBOARD_CONTENT.weeklyGoal.remaining(remaining) : DASHBOARD_CONTENT.weeklyGoal.completed}
            </p>
          </div>

          <div className="bg-purple-50 dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-purple-200 dark:border-gray-700">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">{DASHBOARD_CONTENT.recommended.title}</h3>
            <div className="space-y-3">
              {weakTopics.map((topic, idx) => {
                const style = getTopicStyle(topic.percent);
                return (
                  <div key={idx} onClick={() => router.push(`/problems?topic=${encodeURIComponent(topic.topic)}`)} className={`flex items-center gap-3 p-3 ${style.bg} rounded-lg cursor-pointer hover:opacity-80 transition-opacity`}>
                    <i className={`${style.icon} ${style.iconColor}`}></i>
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{topic.topic}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{DASHBOARD_CONTENT.recommended.successRate(topic.percent)}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary to-purple-600 rounded-xl p-6 text-white">
            <h3 className="font-bold mb-3">{DASHBOARD_CONTENT.timedInterview.title}</h3>
            <p className="text-indigo-100 text-sm mb-4">{DASHBOARD_CONTENT.timedInterview.subtitle}</p>
            <div className="flex items-center gap-2 text-sm text-indigo-200 mb-4">
              <i className="fas fa-calendar"></i>
              <span>{DASHBOARD_CONTENT.timedInterview.date}</span>
            </div>
            <button className="bg-white/20 hover:bg-white/30 text-white font-medium py-2 px-4 rounded-lg text-sm transition-all w-full">
              {DASHBOARD_CONTENT.timedInterview.cta}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
