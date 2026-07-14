// learnerOnly links are hidden from admins; adminOnly links are shown only to admins
export const NAV_LINKS = [
  { to: '/dashboard', label: 'דשבורד', learnerOnly: true },
  { to: '/problems', label: 'שאלות' },
  { to: '/simulation', label: 'סימולציית ראיון', learnerOnly: true },
  { to: '/progress', label: 'התקדמות', learnerOnly: true },
  { to: '/admin/users', label: 'ניהול', adminOnly: true },
];

export const NAV_TEXT = {
  brand: 'CodeInterview',
  noNotifications: 'אין התראות חדשות',
  themeAria: 'החלף מצב תצוגה',
  themeLight: 'מצב בהיר',
  themeDark: 'מצב כהה',
  notificationsAria: 'התראות',
  logoutTitle: 'התנתקות',
  menuAria: 'תפריט',
};
