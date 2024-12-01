import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { User } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(`${process.env.BACKEND_URL}/auth/signin`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });

        const user = await res.json();

        if (user.success) {
          return {
            id: user.id || credentials?.email, // Ensure `id` is present
            token: user.token,
            email: credentials?.email,
          } as User;
        }

        return null;
      },
    }),
    CredentialsProvider({
      id: "google-credentials",
      name: "Google Token",
      credentials: {
        token: { label: "Token", type: "text" },
      },
      async authorize(credentials) {
        const res = await fetch(`${process.env.BACKEND_URL}/auth/whoami`, {
          headers: { Authorization: `Bearer ${credentials?.token}` },
        });

        if (res.ok) {
          const user = await res.json();
          return {
            id: user.id,
            email: user.email,
            token: credentials?.token as string,
          };
        }

        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // Include `id`
        token.token = user.token; // Include backend token
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id as string, // Include `id`
        email: token.email as string,
        token: token.token as string, // Include backend token
      };
      return session;
    },
  },
};

export default NextAuth(authOptions);
