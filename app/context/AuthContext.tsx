'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useSession, signIn, signOut } from "next-auth/react"; 

// Định nghĩa kiểu dữ liệu User
export type UserRole = 'admin' | 'customer';
export interface MockUser {
  role: UserRole;
  email: string;
  avatar?: string;
  name?: string; // Thêm trường tên để hiển thị tên thật từ Google
}

// Định nghĩa kiểu dữ liệu cho tham số Login
interface LoginCredentials {
  email?: string;
  password?: string;
}

// Định nghĩa kiểu dữ liệu cho Context
interface AuthContextType {
  isLoggedIn: boolean;
  user: MockUser | null; 
  isLoading: boolean;
  // Hàm login nhận vào 'provider' và credentials tùy chọn
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
    avatar: session.user.image || "", // Lấy avatar thật từ Google/FB hoặc DB
    name: session.user.name || "",    // Lấy tên thật
    // Lấy role từ session 
    role: (session.user as any).role || 'customer' 
  } : null;

  // Hàm Login gọi NextAuth
  const login = async (provider: string, credentials?: LoginCredentials) => {
    
    if (provider === 'credentials') {
      // Đăng nhập truyền thống (Email/Pass)
      const result = await signIn('credentials', {
        redirect: false, 
        email: credentials?.email,
        password: credentials?.password,
      });

      if (result?.error) {
        throw new Error(result.error);
      } else {
        // Thành công -> Chuyển trang thủ công về trang chủ
        window.location.href = '/'; 
      }

    } else { // Đăng nhập Mạng xã hội (Google/Facebook)
      // Quay về trang chủ nếu thành công
      await signIn(provider, { callbackUrl: '/' }); 
    }
  };

  // Hàm Logout gọi NextAuth
  const logout = () => {
    // callbackUrl: '/signin' để quay về trang đăng nhập sau khi đăng xuất
    signOut({ callbackUrl: '/signin' });
  };

  // Hàm update avatar (không đổi dc avt từ fb hoặc gg)
  const updateAvatar = (newAvatarUrl: string) => {
    alert("Tính năng cập nhật Avatar đang được phát triển (Cần Database để lưu trữ vĩnh viễn).");
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