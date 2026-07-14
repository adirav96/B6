'use client';

import { useEffect, useState } from 'react';
import { useApp } from '@/context/AppContext';
import { apiGetAdminUsers, apiSetUserAdmin } from '@/services/api';
import { ADMIN_USERS_CONTENT } from '@/content/adminUsersContent';

export default function AdminUsers() {
  const { user: currentUser } = useApp();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [savingId, setSavingId] = useState(null);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const { users: data } = await apiGetAdminUsers();
        if (cancelled) return;
        setUsers(data || []);
        setError(null);
      } catch (err) {
        if (cancelled) return;
        setError(err.message || ADMIN_USERS_CONTENT.loadError);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const handleToggle = async (target) => {
    const nextIsAdmin = target.role !== 'admin';
    const isSelf = target.id === currentUser?.id;

    // demoting yourself removes admin access — confirm and send them out after
    if (isSelf && !nextIsAdmin && !window.confirm(ADMIN_USERS_CONTENT.confirmSelfDemote)) {
      return;
    }

    setFeedback('');
    setSavingId(target.id);
    try {
      const { user: updated } = await apiSetUserAdmin(target.id, nextIsAdmin);
      if (isSelf && !nextIsAdmin) {
        // re-bootstrap the app with the new (non-admin) role
        window.location.href = '/dashboard';
        return;
      }
      setUsers((prev) => prev.map((u) => (u.id === updated.id ? { ...u, role: updated.role } : u)));
    } catch (err) {
      setFeedback(err.message || ADMIN_USERS_CONTENT.updateError);
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-purple-900 dark:text-white">{ADMIN_USERS_CONTENT.title}</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">{ADMIN_USERS_CONTENT.subtitle(users.length)}</p>
      </div>

      {feedback && (
        <div className="mb-4 rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 px-4 py-3 text-sm text-red-700 dark:text-red-400">
          {feedback}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-16 text-gray-500 dark:text-gray-400 gap-2">
          <i className="fas fa-spinner fa-spin"></i> {ADMIN_USERS_CONTENT.loading}
        </div>
      ) : error ? (
        <div className="rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 px-4 py-6 text-center text-sm text-red-700 dark:text-red-400">
          {error}
        </div>
      ) : users.length === 0 ? (
        <div className="py-16 text-center text-gray-500 dark:text-gray-400">{ADMIN_USERS_CONTENT.empty}</div>
      ) : (
        <div className="bg-purple-50 dark:bg-gray-800 rounded-xl shadow-sm border border-purple-200 dark:border-gray-700 overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700/60 border-b border-purple-200 dark:border-gray-700">
              <tr>
                <th className="text-right px-3 sm:px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">{ADMIN_USERS_CONTENT.columns.name}</th>
                <th className="text-right px-3 sm:px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase hidden sm:table-cell">{ADMIN_USERS_CONTENT.columns.email}</th>
                <th className="text-right px-3 sm:px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase hidden md:table-cell">{ADMIN_USERS_CONTENT.columns.joined}</th>
                <th className="text-right px-3 sm:px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">{ADMIN_USERS_CONTENT.columns.admin}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
              {users.map((u) => {
                const isAdmin = u.role === 'admin';
                const saving = savingId === u.id;
                return (
                  <tr key={u.id} className="hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors">
                    <td className="px-3 sm:px-6 py-4">
                      <div className="font-medium text-gray-900 dark:text-gray-100">{u.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 sm:hidden truncate max-w-[180px]" dir="ltr">{u.email}</div>
                    </td>
                    <td className="px-3 sm:px-6 py-4 hidden sm:table-cell">
                      <span className="text-sm text-gray-500 dark:text-gray-400" dir="ltr">{u.email}</span>
                    </td>
                    <td className="px-3 sm:px-6 py-4 hidden md:table-cell">
                      <span className="text-sm text-gray-500 dark:text-gray-400">{u.joinDate || '—'}</span>
                    </td>
                    <td className="px-3 sm:px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          role="switch"
                          aria-checked={isAdmin}
                          onClick={() => handleToggle(u)}
                          disabled={saving}
                          dir="ltr"
                          title={isAdmin ? ADMIN_USERS_CONTENT.roles.admin : ADMIN_USERS_CONTENT.roles.user}
                          className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors disabled:opacity-50 ${
                            isAdmin ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                          }`}
                        >
                          <span
                            className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${
                              isAdmin ? 'translate-x-4' : 'translate-x-1'
                            }`}
                          />
                        </button>
                        <span className={`text-xs font-medium ${isAdmin ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}>
                          {saving ? ADMIN_USERS_CONTENT.saving : isAdmin ? ADMIN_USERS_CONTENT.roles.admin : ADMIN_USERS_CONTENT.roles.user}
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
