import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { compare } from "bcryptjs";
import { getServerSession } from "next-auth";
import type { NextAuthOptions, DefaultSession } from "next-auth";
import type { User as PrismaUser } from "@prisma/client";

// ✅ Extend NextAuth's Session types to include id + role
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role: string;
  }
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
  },
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET || "development-secret-key",
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        // ✅ Demo user for development
        if (
          credentials.email === "demo@legitexchange.com" &&
          credentials.password === "demo123"
        ) {
          return {
            id: "demo-user-id",
            name: "Demo User",
            email: "demo@legitexchange.com",
            role: "BUYER",
            image: null,
          };
        }

        // ✅ Tell TS that Prisma returns a User with password
        const user = (await prisma.user.findUnique({
          where: { email: credentials.email },
        })) as (PrismaUser & { password: string }) | null;

        if (!user || !user.password) {
          throw new Error("Invalid email or password");
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.password
        );
        if (!isPasswordValid) {
          throw new Error("Invalid email or password");
        }

        // ✅ Return without password
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.image = token.picture as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any).id;
        token.role = (user as any).role;
        token.name = user.name;
        token.email = user.email;
        token.picture = (user as any).image;
      }
      return token;
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);

export const getCurrentUser = async () => {
  const session = await getAuthSession();
  return session?.user;
};
