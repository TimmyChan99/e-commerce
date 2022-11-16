/* eslint-disable no-unused-vars */
import NextAuth from "next-auth/next";
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    isAdmin?: boolean;
		id?: string;
  }
}

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the
   * `SessionProvider` React Context and trpc context
   */
  interface Session {
      isAdmin?: boolean;
			id?: string;
  }

  /** Passed as a parameter to the `jwt` callback */
  interface User {
    isAdmin?: boolean;
  }
}
