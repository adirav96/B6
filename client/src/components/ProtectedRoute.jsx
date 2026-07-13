'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';

export default function ProtectedRoute({ children, requireAdmin = false }) {
  const { isLoggedIn, loading, isAdmin } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      router.replace('/login');
      return;
    }
    if (!loading && isLoggedIn && requireAdmin && !isAdmin) {
      router.replace('/dashboard');
    }
  }, [isLoggedIn, loading, isAdmin, requireAdmin, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <i className="fas fa-spinner fa-spin text-primary text-3xl"></i>
      </div>
    );
  }

  if (!isLoggedIn) return null;
  if (requireAdmin && !isAdmin) return null;

  return children;
}
//reusable UI