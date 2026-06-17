'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';

export default function AppShell({ children }) {
  const pathname = usePathname();
  const hideNavbar = pathname === '/' || pathname === '/login';

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
}
