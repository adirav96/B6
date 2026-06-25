import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '../context/AppContext.jsx';

/**
 * Custom hook for handling user logout
 */
export function useLogout() {
  const { logout } = useApp();
  const router = useRouter();
  
  return useCallback(() => {
    logout();
    router.push('/login');
  }, [logout, router]);
}
