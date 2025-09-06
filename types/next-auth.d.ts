import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image?: string;
      role: "ADMIN" | "LAWYER" | "SELLER" | "BUYER";
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    image?: string;
    role: "ADMIN" | "LAWYER" | "SELLER" | "BUYER";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "ADMIN" | "LAWYER" | "SELLER" | "BUYER";
    picture?: string;
  }
}
