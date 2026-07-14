'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { useDarkMode } from '@/hooks/useDarkMode';
import { NAV_LINKS, NAV_TEXT } from '@/content/navigationContent';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const { user, logout } = useApp();
  const { dark, toggle: toggleDark } = useDarkMode();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const linkClass = (href) =>
    `px-4 py-5 text-sm font-medium cursor-pointer transition-colors ${
      pathname === href
        ? 'text-primary border-b-[3px] border-primary'
        : 'text-gray-600 hover:text-primary'
    }`;

  const mobileLinkClass = (href) =>
    `block px-4 py-3 text-sm font-medium transition-colors rounded-lg ${
      pathname === href
        ? 'text-primary bg-indigo-50'
        : 'text-gray-600 hover:text-primary hover:bg-gray-50'
    }`;

  return (
    <nav className="app-header sticky top-0 z-50">
      <div className="container-max">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3 sm:gap-8 min-w-0">
            <Link href="/dashboard" className="flex items-center gap-2">
              <i className="fas fa-code text-primary text-2xl"></i>
              <span className="font-bold text-lg sm:text-xl text-purple-900 dark:text-white truncate">{NAV_TEXT.brand}</span>
            </Link>
            <div className="hidden md:flex gap-1">
              {NAV_LINKS.map((link) => (
                <Link key={link.label} href={link.to} className={linkClass(link.to)}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={toggleDark}
              className="p-2 rounded-lg text-gray-400 hover:text-primary transition-colors"
              aria-label={NAV_TEXT.themeAria}
              title={dark ? NAV_TEXT.themeLight : NAV_TEXT.themeDark}
            >
              <i className={`fas ${dark ? 'fa-sun' : 'fa-moon'} text-lg`}></i>
            </button>
            <div className="relative">
              <button
                onClick={() => { setNotifOpen((v) => !v); setMobileOpen(false); }}
                className="relative cursor-pointer"
                aria-label={NAV_TEXT.notificationsAria}
              >
                <i className="fas fa-bell text-gray-400 text-lg hover:text-primary transition-colors"></i>
              </button>
              {notifOpen && (
                <div className="absolute sm:left-0 left-2 right-2 mt-2 w-auto sm:w-64 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-4 px-5 z-50">
                  <p className="text-sm text-gray-500 text-center">{NAV_TEXT.noNotifications}</p>
                </div>
              )}
            </div>
            <Link href="/profile" className="flex items-center gap-2">
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || '')}&background=6366f1&color=fff&size=32`}
                className="w-8 h-8 rounded-full"
                alt="avatar"
              />
              <span className="text-sm font-medium text-gray-700 hidden sm:block">{user?.name}</span>
            </Link>
            <button
              onClick={handleLogout}
              className="text-gray-400 hover:text-red-500 transition-colors p-1"
              title={NAV_TEXT.logoutTitle}
            >
              <i className="fas fa-sign-out-alt"></i>
            </button>
            <button
              className="md:hidden p-2 rounded-lg text-gray-500 hover:text-primary hover:bg-gray-100 transition-colors"
              onClick={() => { setMobileOpen((v) => !v); setNotifOpen(false); }}
              aria-label={NAV_TEXT.menuAria}
            >
              <i className={`fas ${mobileOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-3 pb-4 pt-2 space-y-2 border-t border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 card-sm">
          <div className="stack-mobile">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.to}
                className={`${mobileLinkClass(link.to)} w-full text-left`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
//reusable UI