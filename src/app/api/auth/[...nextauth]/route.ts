import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'email',
          type: 'text',
          placeholder: 'your email',
        },
        password: {
          label: 'password',
          type: 'password',
          placeholder: 'your password',
        },
      },
      async authorize(credentials, req) {
        // Kiểm tra input
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Vui lòng nhập đầy đủ thông tin');
        }

        // Kiểm tra thông tin đăng nhập (nếu có DB thì gọi tại đây)
        if (credentials.email === 'admin@test.com' && credentials.password === '123') {
          return {
            id: '1',
            name: 'Admin Hệ Thống',
            email: 'admin@test.com',
            role: 'admin',
            shopStatus: 'none',
            image: 'https://i.pravatar.cc/150?u=admin',
          };
        }
        if (credentials.email === 'seller@test.com' && credentials.password === '123') {
          return {
            id: '2',
            name: 'Trần Nam',
            email: 'seller@test.com',
            role: 'customer',
            shopStatus: 'active',
            image: 'https://i.pravatar.cc/150?u=seller',
          };
        }
        if (credentials.email === 'customer@test.com' && credentials.password === '123') {
          return {
            id: '2',
            name: 'Trần Thị Nhài',
            email: 'customer@test.com',
            role: 'customer',
            shopStatus: 'none',
            image: 'https://i.pravatar.cc/150?u=customer',
          };
        }
        if (credentials.email === 'pending@test.com' && credentials.password === '123') {
          return {
            id: '4',
            name: 'Nguyễn Bảo Ngọc',
            email: 'pending@test.com',
            role: 'customer',
            shopStatus: 'pending',
            image: 'https://i.pravatar.cc/150?u=pending',
          };
        }
        return null;
      },
    }),
  ],
  // Dùng JWT (Session lưu trong Cookie)
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    // Đưa thông tin role và shopStatus vào JWT
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.shopStatus = (user as any).shopStatus; // Thêm shopStatus vào token
      }
      return token;
    },
    // Đưa thông tin từ JWT vào Session để Frontend truy cập được
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
        (session.user as any).shopStatus = token.shopStatus; // Gán vào session
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
});

export { handler as GET, handler as POST };
