'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';

export default function AppShell({ children }) {
  const pathname = usePathname();
  const hideNavbar = pathname === '/' || pathname === '/login';

  return (
    <div className="w-full max-w-full overflow-x-hidden">
      {!hideNavbar && <Navbar />}
      {children}
    </div>
  );
}
