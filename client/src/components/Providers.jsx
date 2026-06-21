'use client';

import { AppProvider } from '@/context/AppContext';
import AppShell from '@/components/AppShell';
import FirebaseAnalytics from '@/components/FirebaseAnalytics';

export default function Providers({ children }) {
  return (
    <AppProvider>
      <FirebaseAnalytics />
      <AppShell>{children}</AppShell>
    </AppProvider>
  );
}
