export function getFeedbackSections(score) {
  if (score >= 90) {
    return [
      { borderColor: 'border-green-500', title: 'תהליך חשיבה', text: 'הצגת גישה מצוינת ושיטתית. פתרון יעיל ומדויק עם תקשורת ברורה של תהליך החשיבה. כל הכבוד!', stars: 5 },
      { borderColor: 'border-blue-500', title: 'איכות הקוד', text: 'קוד נקי, קריא ויעיל. הפתרון אלגנטי ומראה שליטה טובה בשפה ובמבני נתונים.', stars: 5 },
      { borderColor: 'border-amber-500', title: 'ביצועים', text: 'פתרון מהיר ויעיל. עברת את כל הבדיקות בהצלחה. המשך כך!', stars: 4.5 },
    ];
  }

  if (score >= 70) {
    return [
      { borderColor: 'border-green-500', title: 'תהליך חשיבה', text: 'גישה טובה לפתרון הבעיה. הצלחת להגיע לפתרון עובד. נסה לחשוב על אופטימיזציות נוספות.', stars: 4 },
      { borderColor: 'border-blue-500', title: 'איכות הקוד', text: 'קוד סביר עם מקום לשיפור. שים לב לשמות משתנים ברורים ולטיפול במקרי קצה.', stars: 3.5 },
      { borderColor: 'border-amber-500', title: 'המלצות', text: 'נסה לתרגל עוד בעיות מסוג זה. שים לב לזמן הפתרון ולמספר הרמזים שאתה משתמש בהם.', stars: 3 },
    ];
  }

  return [
    { borderColor: 'border-green-500', title: 'תהליך חשיבה', text: 'ניסיון טוב! נסה להתחיל עם brute force ואז לשפר את הפתרון. חשוב על מבני נתונים שיכולים לעזור.', stars: 2.5 },
    { borderColor: 'border-blue-500', title: 'איכות הקוד', text: 'יש מקום לשיפור משמעותי. תרגל כתיבת קוד נקי ובדק את הפתרון עם דוגמאות לפני הגשה.', stars: 2 },
    { borderColor: 'border-amber-500', title: 'המלצות', text: 'מומלץ לחזור על הנושא ולתרגל בעיות דומות. השתמש ברמזים אם אתה נתקע, ונסה שוב!', stars: 2 },
  ];
}

export const RESULTS_TEXT = {
  notFound: 'לא נמצאו תוצאות',
  backToProblems: 'חזרה לרשימת השאלות',
  scoreOutOf: 'מתוך 100',
  summary: 'הנה הסיכום של הביצועים שלך',
  aiFeedback: 'פידבק מהמראיין AI',
  nextQuestion: 'שאלה הבאה',
  retry: 'נסה שוב',
  statusPassed: 'עבר',
  statusFailed: 'נכשל',
  titleByScore: (score) =>
    score >= 90
      ? 'מעולה! ביצועים מצוינים'
      : score >= 70
      ? 'כל הכבוד! סיימת את הראיון'
      : 'סיימת את הראיון',
  metrics: {
    solveTime: 'זמן פתרון',
    passedTests: 'בדיקות שעברו',
    status: 'סטטוס',
    hintsUsed: 'רמזים שנוצלו',
  },
};
