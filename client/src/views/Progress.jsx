'use client';

import { useMemo } from 'react';
import ActivityGrid from '@/components/ActivityGrid';
import { useApp } from '@/context/AppContext';
import { useProblems } from '@/hooks/useProblems';

export default function Progress() {
  const { solutions, activityLog, getTopicMastery, getDifficultyBreakdown } = useApp();
  const { problems, loading } = useProblems();

  const difficulty = getDifficultyBreakdown(problems);
  const topicMastery = getTopicMastery(problems);

  // need at least 2 submissions for the averages to be meaningful
  const aiScores = useMemo(() => {
    const entries = Object.values(solutions);
    if (entries.length < 2) return null;
    const avgCorrectness = Math.round(entries.reduce((sum, s) => sum + ((s.testsPassed ?? 0) / Math.max(s.totalTests ?? 1, 1)) * 100, 0) / entries.length);
    const avgTime = entries.reduce((sum, s) => sum + (s.timeSpent ?? 0), 0) / entries.length;
    // efficiency peaks at 5 min (300s) and drops linearly — solving in under 5 min scores 100
    const efficiencyScore = Math.round(Math.max(0, Math.min(100, 100 - (avgTime - 300) / 6)));
    const edgeCaseScore = Math.round(entries.reduce((sum, s) => sum + ((s.testsPassed ?? 0) / Math.max(s.totalTests ?? 1, 1)) * 100, 0) / entries.length);
    return [
      { label: 'נכונות הפתרון', percent: avgCorrectness },
      { label: 'יעילות הקוד', percent: efficiencyScore },
      { label: 'Edge Cases', percent: edgeCaseScore },
    ];
  }, [solutions]);

  const { strengths, improvements } = useMemo(() => {
    const s = [];
    const imp = [];
    const entries = Object.values(solutions);
    if (entries.length === 0) return { strengths: ['התחלת את המסע – המשך כך!'], improvements: ['פתור עוד שאלות כדי לקבל פידבק מפורט'] };
    const strongTopics = topicMastery.filter(t => t.percent >= 70);
    const weakTopics = topicMastery.filter(t => t.percent < 40 && t.total > 0);
    if (strongTopics.length > 0) s.push(`שליטה טובה ב-${strongTopics.map(t => t.topic).join(', ')}`);
    const avgTime = entries.reduce((sum, e) => sum + (e.timeSpent ?? 0), 0) / entries.length;
    if (avgTime < 1200) s.push('זמני פתרון מהירים ויעילים');
    const avgScore = entries.reduce((sum, e) => sum + (e.score ?? 0), 0) / entries.length;
    if (avgScore >= 80) s.push('ציונים גבוהים באופן עקבי');
    const hintsUsed = entries.reduce((sum, e) => sum + (e.hintsUsed ?? 0), 0);
    if (hintsUsed === 0 && entries.length >= 3) s.push('פתרון עצמאי ללא שימוש ברמזים');
    if (weakTopics.length > 0) imp.push(`לתרגל עוד ב-${weakTopics.map(t => t.topic).join(', ')}`);
    if (avgTime >= 1800) imp.push('לשפר את ניהול הזמן בפתרון');
    if (hintsUsed > entries.length) imp.push('לנסות לפתור ללא שימוש ברמזים');
    if (avgScore < 60) imp.push('להתמקד בהבנת הבעיה לפני כתיבת קוד');
    if (s.length === 0) s.push('ממשיך להתקדם – כל הכבוד!');
    if (imp.length === 0) imp.push('המשך לתרגל באופן עקבי');
    return { strengths: s, improvements: imp };
  }, [solutions, topicMastery]);

  if (loading) {
    return (
      <div className="h-[calc(100vh-8rem)] flex items-center justify-center">
        <i className="fas fa-spinner fa-spin text-primary text-3xl"></i>
      </div>
    );
  }

  function diffBar(label, colorLabel, colorBar, data) {
    const pct = data.total > 0 ? Math.round((data.solved / data.total) * 100) : 0;
    return (
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span className={`${colorLabel} font-medium`}>{label}</span>
          <span className="text-gray-600 dark:text-gray-300">{data.solved}/{data.total}</span>
        </div>
        <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
          <div className={`${colorBar} rounded-full h-2.5`} style={{ width: `${pct}%` }}></div>
        </div>
      </div>
    );
  }

  function topicColor(percent) {
    if (percent >= 70) return 'bg-green-500';
    if (percent >= 40) return 'bg-amber-500';
    return 'bg-red-500';
  }

  function topicTextColor(percent) {
    if (percent >= 70) return 'text-green-600 dark:text-green-400';
    if (percent >= 40) return 'text-amber-600 dark:text-amber-400';
    return 'text-red-600 dark:text-red-400';
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-purple-900 dark:text-white mb-8">התקדמות ולמידה</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-purple-50 dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-purple-200 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">שאלות לפי רמת קושי</h3>
          <div className="space-y-4">
            {diffBar('קל', 'text-green-600', 'bg-green-500', difficulty.easy)}
            {diffBar('בינוני', 'text-amber-600', 'bg-amber-500', difficulty.medium)}
            {diffBar('קשה', 'text-red-600', 'bg-red-500', difficulty.hard)}
          </div>
        </div>

        <div className="bg-purple-50 dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-purple-200 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">ציוני AI - ממוצע לפי קטגוריה</h3>
          <div className="space-y-3">
            {aiScores ? (
              aiScores.map((score, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 dark:text-gray-200">{score.label}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-primary rounded-full h-2" style={{ width: `${score.percent}%` }}></div>
                    </div>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">{score.percent}%</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-400 text-center py-4">נדרשות עוד תשובות לניתוח מדויק</p>
            )}
          </div>
        </div>

        <div className="bg-purple-50 dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-purple-200 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">פעילות - 30 ימים אחרונים</h3>
          <ActivityGrid activityLog={activityLog} count={28} />
        </div>
      </div>

      <div className="bg-purple-50 dark:bg-gray-800 rounded-xl shadow-sm border border-purple-200 dark:border-gray-700 p-6 mb-8">
        <h2 className="text-lg font-bold text-purple-900 dark:text-white mb-6">שליטה בנושאים</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {topicMastery.map((topic, idx) => (
            <div key={idx} className="border border-purple-200 dark:border-gray-600 bg-purple-50/60 dark:bg-gray-700/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium text-gray-900 dark:text-white">{topic.topic}</span>
                <span className={`text-sm font-bold ${topicTextColor(topic.percent)}`}>{topic.percent}%</span>
              </div>
              <div className="bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                <div className={`${topicColor(topic.percent)} rounded-full h-2`} style={{ width: `${topic.percent}%` }}></div>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">{topic.solved} שאלות הושלמו</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-purple-50 dark:bg-gray-800 rounded-xl shadow-sm border border-purple-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-bold text-purple-900 dark:text-white mb-6">סיכום פידבק מהמראיין AI</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-5 border border-green-200 dark:border-green-800">
            <h3 className="font-bold text-green-800 dark:text-green-400 mb-3"><i className="fas fa-thumbs-up ml-2"></i>נקודות חוזק</h3>
            <ul className="space-y-2 text-sm text-green-700 dark:text-green-300">
              {strengths.map((s, i) => <li key={i} className="flex items-start gap-2"><i className="fas fa-check mt-0.5"></i> {s}</li>)}
            </ul>
          </div>
          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-5 border border-amber-200 dark:border-amber-800">
            <h3 className="font-bold text-amber-800 dark:text-amber-400 mb-3"><i className="fas fa-lightbulb ml-2"></i>נקודות לשיפור</h3>
            <ul className="space-y-2 text-sm text-amber-700 dark:text-amber-300">
              {improvements.map((s, i) => <li key={i} className="flex items-start gap-2"><i className="fas fa-arrow-up mt-0.5"></i> {s}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
