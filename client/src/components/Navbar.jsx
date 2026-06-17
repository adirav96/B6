'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const { user, logout } = useApp();
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

  const navLinks = [
    { to: '/dashboard', label: 'דשבורד' },
    { to: '/problems', label: 'שאלות' },
    { to: '/problems', label: 'סימולציית ראיון' },
    { to: '/progress', label: 'התקדמות' },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <Link href="/dashboard" className="flex items-center gap-2">
              <i className="fas fa-code text-primary text-2xl"></i>
              <span className="font-bold text-xl text-dark">CodeInterview</span>
            </Link>
            <div className="hidden md:flex gap-1">
              {navLinks.map((link) => (
                <Link key={link.label} href={link.to} className={linkClass(link.to)}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => { setNotifOpen((v) => !v); setMobileOpen(false); }}
                className="relative cursor-pointer"
                aria-label="התראות"
              >
                <i className="fas fa-bell text-gray-400 text-lg hover:text-primary transition-colors"></i>
              </button>
              {notifOpen && (
                <div className="absolute left-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 py-4 px-5 z-50">
                  <p className="text-sm text-gray-500 text-center">אין התראות חדשות</p>
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
              title="התנתקות"
            >
              <i className="fas fa-sign-out-alt"></i>
            </button>
            <button
              className="md:hidden p-2 rounded-lg text-gray-500 hover:text-primary hover:bg-gray-100 transition-colors"
              onClick={() => { setMobileOpen((v) => !v); setNotifOpen(false); }}
              aria-label="תפריט"
            >
              <i className={`fas ${mobileOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pb-4 pt-1 space-y-1 border-t border-gray-100 bg-white">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.to}
              className={mobileLinkClass(link.to)}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
//reusable UI