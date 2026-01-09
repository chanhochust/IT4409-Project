import NextAuth, { DefaultSession, type NextAuthOptions } from 'next-auth';
import { isAxiosError } from 'axios';
import CredentialProvider from 'next-auth/providers/credentials';
import { DefaultJWT } from 'next-auth/jwt';
import { AuthService } from 'src/shared/services/api/auth.service';

// Domain-specific fields we want on the user/session
interface JwtUser {
  id?: string;
  name?: string | null;
  image?: string | null;
  language?: string | null;
  activation_bank?: number;
  workspace_id?: string | null;
}

// Module augmentation for next-auth
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: User;
  }
  interface User extends JwtUser {
    accessToken?: string | null;
    email?: string;
    activation_bank?: number;
    workspace_id?: string | null;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    accessToken?: null | string;
    activation_bank?: number;
    language?: string | null;
    workspace_id?: string | null;
  }
}

// NextAuth v4 configuration
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialProvider({
      credentials: { email: {}, password: {} },
      async authorize(credentials) {
        if (!credentials) return null;
        const email = String(credentials.email ?? '');
        const password = String(credentials.password ?? '');

        try {
          const loginResponse = await AuthService.normalLogin({ email, password });
          const payload = loginResponse?.data;

          if (payload?.user && typeof payload?.accessToken === 'string') {
            return {
              id: String(payload.user.id),
              accessToken: payload.accessToken,
              name: payload.user.name ?? null,
              image: null,
              email: payload.user.email,
              activation_bank: 0,
              workspace_id: null,
              language: payload.user.language ?? null,
            };
          }
          // Invalid credentials or unexpected response shape
          return null;
        } catch (err) {
          // Map axios errors to NextAuth expectations
          if (isAxiosError(err)) {
            const status = err.response?.status;
            // Treat 400/401 as invalid credentials -> return null (401 from NextAuth)
            if (status === 400 || status === 401) return null;
          }
          // For other errors, bubble as CredentialsSignin so NextAuth reports properly

          console.error('Credentials authorize failed:', err);
          throw new Error('CredentialsSignin');
        }
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    jwt({ token, user }) {
      // Persist user fields into the token when available
      if (user) {
        token.accessToken = typeof user.accessToken === 'string' ? user.accessToken : (token.accessToken ?? null);
        token.id = typeof user.id === 'string' ? user.id : token.id;
        token.picture =
          typeof user.image === 'string' || user.image === null ? (user.image ?? token.picture) : token.picture;
        token.name = typeof user.name === 'string' || user.name === null ? (user.name ?? token.name) : token.name;
        token.language =
          typeof user.language === 'string' || user.language === null
            ? (user.language ?? token.language)
            : token.language;
        token.email = typeof user.email === 'string' ? user.email : token.email;
        token.activation_bank = typeof user.activation_bank === 'number' ? user.activation_bank : token.activation_bank;
        token.workspace_id =
          typeof user.workspace_id === 'string' || user.workspace_id === null
            ? (user.workspace_id ?? token.workspace_id)
            : token.workspace_id;
      }
      return token;
    },
    session({ session, token }) {
      // Build session.user from token fields
      if (typeof token.accessToken === 'string') {
        session.user = {
          id: typeof token.id === 'string' ? token.id : '',
          name: token.name ?? null,
          image: token.picture ?? null,
          language: (token.language as string | null) ?? null,
          accessToken: token.accessToken,
          email: (token.email as string) ?? '',
          activation_bank: token.activation_bank,
          workspace_id: token.workspace_id ?? null,
        };
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
};

const handler = NextAuth(authOptions);
export const handlers = { GET: handler, POST: handler } as const;
export default handler;
