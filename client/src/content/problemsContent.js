export const PROBLEMS_CONTENT = {
  title: 'בנק שאלות',
  subtitle: (count) => `${count}+ שאלות בנושאי קידוד נפוצים בראיונות`,
  searchPlaceholder: 'חיפוש שאלה...',
  filters: {
    topicAll: 'כל הנושאים',
    difficultyAll: 'כל הרמות',
    statusAll: 'כל הסטטוסים',
    difficulty: {
      easy: 'קל',
      medium: 'בינוני',
      hard: 'קשה',
    },
    status: {
      completed: 'הושלם',
      failed: 'לא עבר',
      inProgress: 'בתהליך',
      notStarted: 'לא התחיל',
    },
  },
  tableHeaders: {
    status: 'סטטוס',
    question: 'שאלה',
    topic: 'נושא',
    level: 'רמה',
    acceptance: 'אחוז הצלחה',
    companies: 'חברות',
    publish: 'פרסום',
  },
  publish: {
    on: 'מפורסם',
    off: 'טיוטה',
    save: 'שמור',
    saving: 'שומר...',
    success: 'סטטוס הפרסום עודכן',
    error: 'עדכון הפרסום נכשל',
  },
};
