'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';

export default function AdminRoute({ children }) {
  const { user, loading, isLoggedIn } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!isLoggedIn || !user?.isAdmin)) {
      router.replace('/dashboard');
    }
  }, [loading, isLoggedIn, user, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <i className="fas fa-spinner fa-spin text-primary text-3xl"></i>
      </div>
    );
  }

  if (!isLoggedIn || !user?.isAdmin) return null;

  return children;
}