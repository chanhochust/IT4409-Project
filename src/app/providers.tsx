'use client';
import React, { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { AuthProvider } from './context/AuthContext';
import { Header } from './components/header';
import Footer from './components/footer';
type Props = {
  children: ReactNode;
};

export function AppProviders({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const showMainLayout =
    !pathname.startsWith('/auth') && !pathname.startsWith('/admin') && !pathname.startsWith('/seller'); // Ẩn header & footer với trang admin và login

  return (
    <SessionProvider>
      <AuthProvider>
        {showMainLayout && <Header />}

        <main>{children}</main>

        {showMainLayout && <Footer />}
      </AuthProvider>
    </SessionProvider>
  );
}
