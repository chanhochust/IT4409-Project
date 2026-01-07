'use client';

import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { ReactQueryProvider } from 'src/shared/providers/ReactQueryProvider';
import { Toaster } from 'src/shared/components/ui/sonner/AppSonner';

export function AppProviders({ children }: { readonly children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ReactQueryProvider>
        {children}
        <Toaster />
      </ReactQueryProvider>
    </SessionProvider>
  );
}
