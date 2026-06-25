'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import AchievementBadge from '@/components/AchievementBadge';
import { getAchievements } from '@/data/fakeData';
import { useApp } from '@/context/AppContext';

const HEBREW_MONTHS = ['ינואר','פברואר','מרץ','אפריל','מאי','יוני','יולי','אוגוסט','ספטמבר','אוקטובר','נובמבר','דצמבר'];

export default function Profile() {
  const { user, logout, solutions, activityLog } = useApp();
  const achievements = useMemo(() => getAchievements(solutions, activityLog), [solutions, activityLog]);
  const router = useRouter();

  const handleLogout = () => { logout(); router.push('/login'); };

  const joinLabel = useMemo(() => {
    if (!user.joinDate) return '';
    const d = new Date(user.joinDate);
    return `${HEBREW_MONTHS[d.getMonth()]} ${d.getFullYear()}`;
  }, [user.joinDate]);

  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=ffffff&color=6366f1&size=96&font-size=0.35`;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-purple-50 dark:bg-gray-800 rounded-xl shadow-sm border border-purple-200 dark:border-gray-700 overflow-hidden">
        <div className="bg-gradient-to-l from-primary to-purple-600 p-8">
          <div className="flex items-center gap-6">
            <img src={avatarUrl} className="w-24 h-24 rounded-full border-4 border-white/30" alt="avatar" />
            <div className="text-white">
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-indigo-200 mt-1">סטודנט שנה ג׳ - מדעי המחשב, {user.university}</p>
              <div className="flex items-center gap-4 mt-3 text-sm text-indigo-200">
                <span><i className="fas fa-calendar-alt ml-1"></i> הצטרף: {joinLabel}</span>
                <span><i className="fas fa-map-marker-alt ml-1"></i> תל אביב</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">פרטים אישיים</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-500 dark:text-gray-400">אימייל</label>
                  <p className="text-gray-900 dark:text-gray-100">{user.email}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500 dark:text-gray-400">תחומי עניין</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {['Backend', 'Data Structures', 'Machine Learning', 'System Design'].map(tag => (
                      <span key={tag} className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-medium px-3 py-1 rounded-full">{tag}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-500 dark:text-gray-400">חברות יעד</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {['Google', 'Microsoft', 'Wix', 'Monday.com'].map(c => (
                      <span key={c} className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-xs font-medium px-3 py-1 rounded-full">{c}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">הישגים</h3>
              <div className="grid grid-cols-3 gap-3">
                {achievements.map((a, idx) => <AchievementBadge key={idx} {...a} />)}
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-purple-200 dark:border-gray-700">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-500 hover:text-red-700 font-medium transition-colors"
            >
              <i className="fas fa-sign-out-alt"></i>
              התנתקות מהחשבון
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
