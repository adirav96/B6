export const INTERVIEW_SESSION_CONTENT = {
  notFound: {
    title: 'השאלה לא נמצאה',
    backToList: 'חזרה לרשימת השאלות',
  },
  aiError: 'מצטער, קרתה שגיאה. נסה שוב.',
  sim: {
    fallbackQuestion: (idx) => `שאלה ${idx + 1}`,
    backToSimulation: 'סימולציה',
  },
  tabs: {
    problem: 'שאלה',
    chat: 'מראיין AI',
    hints: 'רמזים',
  },
  problem: {
    example: (idx) => `דוגמה ${idx + 1}:`,
    constraints: 'אילוצים:',
    inputLabel: 'Input:',
    outputLabel: 'Output:',
    explanationLabel: 'Explanation:',
  },
  chat: {
    placeholder: 'שאלו את המראיין...',
  },
  hints: {
    title: 'רמזים',
    locked: (idx) => `רמז ${idx + 1}`,
    reveal: 'לחץ לחשיפה',
  },
  editor: {
    language: 'Python 3',
    reset: 'איפוס',
    run: 'הרצה',
    runLoading: 'מריץ...',
    submit: 'הגשה',
    submitLoading: 'מגיש...',
    testResults: 'תוצאות בדיקה:',
  },
};
