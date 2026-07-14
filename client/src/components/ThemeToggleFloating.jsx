'use client';

import { useDarkMode } from '@/hooks/useDarkMode';
import { NAV_TEXT } from '@/content/navigationContent';

export default function ThemeToggleFloating() {
  const { dark, toggle } = useDarkMode();

  return (
    <button
      onClick={toggle}
      className="fixed top-4 left-4 z-[60] p-2.5 rounded-xl bg-white/90 dark:bg-gray-800/90 border border-purple-200 dark:border-gray-700 text-gray-600 dark:text-gray-200 hover:text-primary shadow-sm backdrop-blur transition-colors"
      aria-label={NAV_TEXT.themeAria}
      title={dark ? NAV_TEXT.themeLight : NAV_TEXT.themeDark}
      type="button"
    >
      <i className={`fas ${dark ? 'fa-sun' : 'fa-moon'} text-base`}></i>
    </button>
  );
}
