import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("trying to login ");
        const res = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });

        const user = await res.json();
        console.log(user, "user credentials");

        if (user.user) {
          console.log("going to next step");
          return {
            id: user.user.id, // Ensure `id` is present
            token: user.accessToken,
            email: user.user.email,
            firstName: user.user.firstName,
            lastName: user.user.lastName,
            profilePicture: user.user.profilePicture,
            isEmailVerified: user.user.isEmailVerified,
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
          console.log(user, "user goole");
          return {
            id: user.id,
            email: user.email,
            token: credentials?.token as string,
            firstName: user.firstName,
            lastName: user.lastName,
            profilePicture: user.profilePicture,
            isEmailVerified: user.isEmailVerified,
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
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.profilePicture = user.profilePicture;
        token.isEmailVerified = user.isEmailVerified;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id as string, // Include `id`
        email: token.email as string,
        token: token.token as string, // Include backend token
        firstName: token.firstName as string,
        lastName: token.lastName as string,
        profilePicture: token.profilePicture as string,
        isEmailVerified: token.isEmailVerified as boolean,
      };
      return session;
    },
    async redirect({ baseUrl }) {
      return baseUrl;
    },
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
  },
};

export default NextAuth(authOptions);
