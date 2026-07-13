export const DASHBOARD_CONTENT = {
  greetingPrefix: 'שלום,',
  greetingSuffix: '! 👋',
  greetingQuestion: 'מוכן לתרגל היום?',
  greetingSolvedMessage: (count) => `כבר פתרת ${count} שאלות!`,
  greetingEmptyMessage: 'בוא נתחיל לתרגל!',
  stats: {
    solved: 'שאלות שנפתרו',
    streak: 'ימים ברצף',
    streakBadge: 'רצף!',
    avgTime: 'זמן ממוצע לפתרון',
    avgScore: 'ציון ממוצע',
  },
  resumeTitle: 'המשך מאיפה שהפסקת',
  empty: {
    title: 'עוד לא התחלת? בוא נתחיל!',
    subtitle: 'בחר שאלה מהרשימה והתחל לתרגל',
    cta: 'לרשימת השאלות',
  },
  weeklyGoal: {
    title: 'יעד שבועי',
    remaining: (n) => `עוד ${n} שאלות להשלמת היעד השבועי`,
    completed: 'כל הכבוד! השלמת את היעד השבועי 🎉',
  },
  recommended: {
    title: 'מומלץ לתרגל',
    successRate: (percent) => `אחוז הצלחה: ${percent}%`,
  },
  timedInterview: {
    title: 'ראיון מתוזמן',
    subtitle: 'סימולציית ראיון מלאה - 45 דקות',
    date: 'יום רביעי, 21.05 בשעה 18:00',
    cta: 'הכנה לראיון',
  },
  activity: {
    inProgress: 'בתהליך',
    completedWithScore: (score) => `הושלם - ${score}%`,
  },
};
