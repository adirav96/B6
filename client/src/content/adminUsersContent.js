export const ADMIN_USERS_CONTENT = {
  title: 'ניהול משתמשים',
  subtitle: (count) => `${count} משתמשים רשומים`,
  columns: {
    name: 'שם',
    email: 'אימייל',
    joined: 'הצטרף',
    admin: 'הרשאת מנהל',
  },
  roles: {
    admin: 'מנהל',
    user: 'משתמש',
  },
  loading: 'טוען משתמשים...',
  loadError: 'טעינת המשתמשים נכשלה',
  empty: 'אין משתמשים',
  saving: 'מעדכן...',
  updateError: 'עדכון ההרשאה נכשל',
  confirmSelfDemote: 'אתה עומד להסיר מעצמך הרשאת מנהל ותועבר למסך הרגיל. להמשיך?',
};
