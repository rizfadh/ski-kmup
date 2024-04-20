import type { NextAuthConfig } from "next-auth";
import {
  DEFAULT_LOGIN_REDIRECT,
  authRoutes,
  privateRoutes,
} from "./constants/routes";

export const authConfig = {
  pages: {
    signIn: authRoutes.login,
  },

  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedin = !!auth?.user;

      const isPrivateRoute = Object.values(privateRoutes).includes(
        nextUrl.pathname,
      );
      const isAuthRoute = Object.values(authRoutes).includes(nextUrl.pathname);

      if (isLoggedin && isAuthRoute) {
        return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
      }

      if (!isLoggedin && isPrivateRoute) {
        return false;
      }
      return true;
    },
  },

  providers: [],
} satisfies NextAuthConfig;
