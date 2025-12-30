'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';

export type UserRole = 'admin' | 'customer';
export type ShopStatus = 'active' | 'pending' | 'none' | 'disabled' | 'rejected';

export interface MockUser {
  id: string;
  role: UserRole;
  email: string;
  avatar?: string;
  phone?: string;
  address?: string;
  name?: string;
  shopStatus: ShopStatus;
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

  const isLoggedIn = status === 'authenticated';
  const isLoading = status === 'loading';

  const user: MockUser | null = session?.user
    ? {
        id: (session.user as any).id || '',
        email: session.user.email || '',
        avatar: session.user.image || '',
        name: session.user.name || '',
        role: (session.user as any).role || 'customer',
        shopStatus: (session.user as any).shopStatus || 'none',
        phone: (session.user as any).phone || '',
        address: (session.user as any).address || '',
      }
    : null;

  const login = async (provider: string, credentials?: any) => {
    try {
      if (provider === 'credentials') {
        const result = await signIn('credentials', {
          redirect: false, // Rất quan trọng: cho phép trang Sign-in tự điều hướng
          ...credentials,
        });

        if (result?.error) {
          throw new Error(result.error);
        }

        return result;
      } else {
        // Đối với Google/Facebook, dùng redirect mặc định về trang chủ
        await signIn(provider, { callbackUrl: '/' });
      }
    } catch (error) {
      console.error('AuthContext Login Error:', error);
      throw error;
    }
  };

  // Hàm Logout chuẩn: Xóa session và chuyển về trang đăng nhập
  const logout = () => {
    signOut({ callbackUrl: '/auth/signin' });
  };

  const updateAvatar = (newAvatarUrl: string) => {
    alert('Tính năng cập nhật Avatar cần Database để lưu trữ vĩnh viễn.');
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
