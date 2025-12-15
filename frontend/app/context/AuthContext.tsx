'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useSession, signIn, signOut } from "next-auth/react"; 

export type UserRole = 'admin' | 'customer';

export interface MockUser {
  role: UserRole;
  email: string;
  avatar?: string;
  name?: string;
}

interface LoginCredentials {
  email?: string;
  password?: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: MockUser | null; 
  isLoading: boolean;
  login: (provider: string, credentials?: LoginCredentials) => Promise<void>; 
  logout: () => void;
  updateAvatar: (newAvatarUrl: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();

  const isLoggedIn = status === "authenticated";
  const isLoading = status === "loading";

  const user: MockUser | null = session?.user ? {
    email: session.user.email || "",
    avatar: session.user.image || "", 
    name: session.user.name || "",    
    role: (session.user as any).role || 'customer' 
  } : null;

  const login = async (provider: string, credentials?: LoginCredentials) => {
    if (provider === 'credentials') {
      const result = await signIn('credentials', {
        redirect: false,
        email: credentials?.email,
        password: credentials?.password,
      });

      if (result?.error) {
        throw new Error(result.error);
      } else {
        window.location.href = '/'; 
      }
    } else {
      await signIn(provider, { callbackUrl: '/' }); 
    }
  };

  // Hàm Logout chuẩn: Xóa session và chuyển về trang đăng nhập
  const logout = () => {
    signOut({ callbackUrl: '/auth/signin' });
  };

  const updateAvatar = (newAvatarUrl: string) => {
    alert("Tính năng cập nhật Avatar cần Database để lưu trữ vĩnh viễn.");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, isLoading, updateAvatar }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}