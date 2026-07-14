'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '../context/AppContext';
import { AUTH_CONTENT } from '@/content/authContent';

export default function Auth({ initialMode = 'login' }) {
  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [university, setUniversity] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const { login, register } = useApp();

  useEffect(() => {
    const saved = localStorage.getItem('remembered_email');
    if (saved) {
      setEmail(saved);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (mode === 'login') {
      if (!email || !password) { setError(AUTH_CONTENT.validation.loginRequired); return; }
      setSubmitting(true);
      const result = await login(email, password);
      setSubmitting(false);
      if (result.success) {
        if (rememberMe) localStorage.setItem('remembered_email', email);
        else localStorage.removeItem('remembered_email');
        router.push('/dashboard');
      } else {
        setError(result.error);
      }
    } else {
      if (!name || !email || !password) { setError(AUTH_CONTENT.validation.registerRequired); return; }
      if (password.length < 8 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password)) {
        setError(AUTH_CONTENT.validation.passwordPolicy);
        return;
      }
      setSubmitting(true);
      const result = await register(name, email, password, university || '');
      setSubmitting(false);
      if (result.success) {
        router.push('/dashboard');
      } else {
        setError(result.error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-bl from-indigo-900 via-purple-900 to-indigo-800 dark:from-[#0d0b1a] dark:via-[#1a1033] dark:to-[#0b0a17] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <i className="fas fa-code text-indigo-300 text-3xl"></i>
            <span className="font-bold text-2xl text-white">{AUTH_CONTENT.brand}</span>
          </div>
          <p className="text-indigo-200">{AUTH_CONTENT.subtitle}</p>
        </div>

        <div className="bg-purple-50 dark:bg-gray-900 rounded-2xl shadow-xl p-8 border border-purple-200 dark:border-gray-700">
          <div className="flex mb-6 bg-purple-100 dark:bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => { setMode('login'); setError(''); }}
              className={`flex-1 py-2.5 text-sm font-medium rounded-md transition-colors ${
                mode === 'login' ? 'bg-white dark:bg-gray-700 text-primary shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700'
              }`}
            >
              {AUTH_CONTENT.tabs.login}
            </button>
            <button
              onClick={() => { setMode('register'); setError(''); }}
              className={`flex-1 py-2.5 text-sm font-medium rounded-md transition-colors ${
                mode === 'register' ? 'bg-white dark:bg-gray-700 text-primary shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700'
              }`}
            >
              {AUTH_CONTENT.tabs.register}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{AUTH_CONTENT.labels.fullName}</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={AUTH_CONTENT.placeholders.fullName}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{AUTH_CONTENT.labels.email}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={AUTH_CONTENT.placeholders.email}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{AUTH_CONTENT.labels.password}</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={AUTH_CONTENT.placeholders.password}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                dir="ltr"
              />
              {mode === 'register' && (
                <p className="text-xs text-gray-400 mt-1">{AUTH_CONTENT.validation.passwordHint}</p>
              )}
            </div>

            {mode === 'login' && (
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 accent-primary cursor-pointer"
                />
                <label htmlFor="rememberMe" className="text-sm text-gray-600 cursor-pointer select-none">
                  {AUTH_CONTENT.labels.rememberMe}
                </label>
              </div>
            )}

            {mode === 'register' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{AUTH_CONTENT.labels.university}</label>
                <input
                  type="text"
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                  placeholder={AUTH_CONTENT.placeholders.university}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg flex items-center gap-2">
                <i className="fas fa-exclamation-circle"></i>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-lg transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <span className="flex items-center justify-center gap-2">
                  <i className="fas fa-spinner fa-spin"></i>
                  {mode === 'login' ? AUTH_CONTENT.submit.loginLoading : AUTH_CONTENT.submit.registerLoading}
                </span>
              ) : (
                mode === 'login' ? AUTH_CONTENT.submit.login : AUTH_CONTENT.submit.register
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
