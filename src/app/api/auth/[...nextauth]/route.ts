import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import CredentialsProvider from 'next-auth/providers/credentials';
// Import dữ liệu từ nguồn tập trung để đảm bảo tính nhất quán
import { mockUsers, mockProfiles } from '@/src/data/mockData';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || '',
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || '',
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'text', placeholder: 'your email' },
        password: { label: 'password', type: 'password', placeholder: 'your password' },
      },
      async authorize(credentials) {
        // 1. Kiểm tra input đầu vào
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Vui lòng nhập đầy đủ thông tin');
        }

        /**
         * 2. TÌM KIẾM NGƯỜI DÙNG TRONG DATABASE (MOCK)
         * Chúng ta tìm trong mảng mockUsers (bao gồm cả User vừa đăng ký xong)
         */
        const user = mockUsers.find((u) => u.email === credentials.email && u.password === credentials.password);

        if (user) {
          /**
           * 3. LẤY THÔNG TIN HỒ SƠ BỔ SUNG
           * Truy xuất từ mảng mockProfiles dựa trên ID người dùng
           */
          const profile = mockProfiles[user.id] || {};

          // Trả về object User đầy đủ để NextAuth đưa vào JWT
          return {
            id: user.id,
            name: profile.fullName || user.email.split('@')[0],
            email: user.email,
            role: user.role,
            shopStatus: user.shopStatus,
            phone: profile.phone || '',
            address: profile.address || '',
            image: profile.avatar || `https://i.pravatar.cc/150?u=${user.id}`,
          };
        }

        // Nếu không khớp thông tin
        return null;
      },
    }),
  ],
  // Sử dụng chiến lược JWT để lưu Session trong Cookie mã hóa
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 ngày
  },
  callbacks: {
    /**
     * TOKEN CALLBACK:
     * Lưu các trường tùy chỉnh (role, shopStatus, id...) vào Token JWT
     */
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
        token.shopStatus = (user as any).shopStatus;
        token.phone = (user as any).phone;
        token.address = (user as any).address;
      }
      return token;
    },
    /**
     * SESSION CALLBACK:
     * Đưa dữ liệu từ Token vào Session để Frontend (useAuth) có thể truy cập được
     */
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
        (session.user as any).shopStatus = token.shopStatus;
        (session.user as any).phone = token.phone;
        (session.user as any).address = token.address;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  debug: process.env.NODE_ENV === 'development',
});

export { handler as GET, handler as POST };
