import NextAuth from "next-auth";
import Credentials from 'next-auth/providers/credentials';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const client = await pool.connect();
        
        try {
          const result = await client.query(
            'SELECT * FROM accounts WHERE email_add = $1',
            [credentials.email]
          );
          
          if (result.rows.length === 0) {
            return null;
          }
          const user = result.rows[0];
          const passwordChecking = String(credentials.password);
          const isValidPassword = await bcrypt.compare(
            String(passwordChecking), 
            String(user.password).trim()
          );

          if (isValidPassword) {
            return {
              id: user.id.toString().trim(),
              username: user.user_name.trim(),
              email: user.email_add.trim(),
              name: user.full_name.trim(),
              role: user.account_type.trim(),
              phone: user.phone_number.trim()
            };
          }
          return null;
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        } finally {
          client.release();
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user?.role;
        token.phone = user?.phone;
        token.username = user?.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as { id: string; role: string; phone: string; username:string;}).id = token.sub as string;
        (session.user as { id: string; role: string; phone: string; username:string;}).role = token.role as string;
        (session.user as { id: string; role: string; phone: string; username:string;}).phone = token.phone as string;
        (session.user as { id: string; role: string; phone: string; username:string;}).username = token.username as string
      }
      return session;
    }
  },
  pages: {
    signIn: '/Login'
  },
  session: {
    strategy: 'jwt'
  }
});