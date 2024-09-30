import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    roles: string[];
  }
  interface Session {
    user: User & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    roles: string[];
  }
}
