import type { NextAuthConfig } from "next-auth";
import { DEFAULT_LOGIN_REDIRECT, authRoutes } from "./constants/routes";
import { isPrivateRoute } from "./lib/utils";

export const authConfig = {
  pages: {
    signIn: authRoutes.login,
  },

  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedin = !!auth?.user;
      const { pathname } = nextUrl;

      const isAuthRoute = Object.values(authRoutes).includes(pathname);

      if (isLoggedin && isAuthRoute) {
        return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
      }

      if (!isLoggedin && isPrivateRoute(pathname)) {
        return false;
      }

      return true;
    },
  },

  providers: [],
} satisfies NextAuthConfig;
