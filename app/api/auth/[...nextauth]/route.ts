import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";

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
            name:"Credentials",
            credentials:{
                email:{
                    label:'email',
                    type:'text',
                    placeholder:'your email'
                },
                password:{
                    label:'password',
                    type:'password',
                    placeholder:'your password'
                }
            },
            async authorize(credentials, req) {
        // Kiểm tra input
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Vui lòng nhập đầy đủ thông tin");
        }

        // Kiểm tra thông tin đăng nhập (nếu có DB thì gọi tại đây)
        if (credentials.email === "admin@test.com" && credentials.password === "123") {
          return { 
            id: "1", 
            name: "Admin User", 
            email: "admin@test.com", 
            role: "admin",
            image: "https://i.pravatar.cc/150?u=admin" 
          };
        }
        if (credentials.email === "customer@test.com" && credentials.password === "123") {
          return { 
            id: "2", 
            name: "Khách Hàng", 
            email: "customer@test.com", 
            role: "customer",
            image: "https://i.pravatar.cc/150?u=customer"
          };
        }
        return null;
        }
    })
  ],
  // Dùng JWT (Session lưu trong Cookie)
  session: {
    strategy: "jwt",
  },
  callbacks: {
    // Đưa thông tin role vào JWT
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role; // Lưu role vào token
      }
      return token;
    },
    // Đưa thông tin role từ JWT vào Session 
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role; 
      }
      return session;
    },
  },
  pages: {
    signIn: '/signin',
  },
});

export { handler as GET, handler as POST };