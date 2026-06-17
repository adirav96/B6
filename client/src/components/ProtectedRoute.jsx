'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';

export default function ProtectedRoute({ children }) {
  const { isLoggedIn, loading } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      router.replace('/login');
    }
  }, [isLoggedIn, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <i className="fas fa-spinner fa-spin text-primary text-3xl"></i>
      </div>
    );
  }

  if (!isLoggedIn) return null;

  return children;
}
//reusable UI