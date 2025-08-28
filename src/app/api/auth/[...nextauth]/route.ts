import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { Pool } from 'pg'
import bcrypt from 'bcryptjs'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const client = await pool.connect()
        
        try {
          const result = await client.query(
            'SELECT id, email_add, full_name, account_type, password FROM accounts WHERE email_add = $1',
            [credentials.email]
          )
          
          if (result.rows.length === 0) {
            return null
          }
          const user = result.rows[0]
          const passwordChecking = String(credentials.password)
          console.log(user);
          const isValidPassword = await bcrypt.compare(
            String(passwordChecking), 
            String(user.password).trim()
          )
          console.log(user.password);
          console.log(isValidPassword);
          console.log(passwordChecking);

          if (isValidPassword) {
            return {
              id: user.id.toString(),
              email: user.email_add,
              name: user.full_name,
              role: user.account_type
            }
          }

          return null
        } catch (error) {
          console.error('Auth error:', error)
          return null
        } finally {
          client.release()
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user?.role
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        ;(session.user as { id: string; role: string }).id = token.sub as string
        ;(session.user as { id: string; role: string }).role = token.role as string
      }
      return session
    }
  },
  pages: {
    signIn: '/Login'
  },
  session: {
    strategy: 'jwt'
  }
})

export const { GET, POST } = handlers