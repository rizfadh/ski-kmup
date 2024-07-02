import type { NextAuthConfig } from "next-auth";
import {
  DEFAULT_LOGIN_REDIRECT,
  authRoutes,
  privateRoutes,
  publicRoutes,
} from "./constants/routes";
import { isPrivateRoute } from "./lib/utils";

export const authConfig = {
  pages: {
    signIn: authRoutes.login,
  },

  providers: [],

  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedin = !!auth?.user;
      const { pathname } = nextUrl;

      const isAuthRoute = Object.values(authRoutes).includes(pathname);
      const isHomeRoute = pathname === publicRoutes.home;

      const shouldRedirectToDashboard =
        isLoggedin && (isAuthRoute || isHomeRoute);
      const hasNoRole = isLoggedin && !auth?.user.role;

      if (shouldRedirectToDashboard) {
        return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
      }

      if (hasNoRole) return false;

      if (isLoggedin) {
        const { role } = auth.user;

        const admin = role === "ADMIN";
        const kpsdm = role === "HEADOFKPSDM";
        const medcen = role === "HEADOFMEDCEN";
        const treasurer = role === "TREASURER";
        const headOfDivision = role === "HEADOFDIVISION" || kpsdm || medcen;
        const chairman = role === "CHAIRMAN";
        const secretary = role === "SECRETARY";

        if (!kpsdm && pathname.startsWith(privateRoutes.registrations)) {
          return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }

        if (!medcen && pathname.startsWith(privateRoutes.postsManage)) {
          return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }

        if (
          !medcen &&
          pathname.startsWith(privateRoutes.postDraft("").split("/:")[0])
        ) {
          return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }

        if (
          !medcen &&
          pathname.startsWith(privateRoutes.postEdit("").split("/:")[0])
        ) {
          return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }

        if (!treasurer && pathname.startsWith(privateRoutes.cashManage)) {
          return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }

        if (
          !headOfDivision &&
          pathname.startsWith(privateRoutes.programManage)
        ) {
          return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }

        if (
          !(chairman || secretary || treasurer) &&
          pathname.startsWith(privateRoutes.programConfirm)
        ) {
          return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }

        if (
          !(chairman || headOfDivision) &&
          pathname.startsWith(privateRoutes.reportManage)
        ) {
          return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }

        if (
          !(secretary || treasurer) &&
          pathname.startsWith(privateRoutes.reportConfirm)
        ) {
          return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }

        if (!admin && pathname.startsWith(privateRoutes.settings)) {
          return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
      }

      if (!isLoggedin && isPrivateRoute(pathname)) {
        return false;
      }

      return true;
    },

    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role;
      }

      return session;
    },
  },
} satisfies NextAuthConfig;
