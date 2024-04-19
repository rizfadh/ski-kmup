import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import {
  publicRoutes,
  apiAuthPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
} from "@/constants/routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedin = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = Object.values(publicRoutes).includes(nextUrl.pathname);
  const isAuthRoute = Object.values(authRoutes).includes(nextUrl.pathname);

  if (isApiAuthRoute) return;

  if (isAuthRoute && isLoggedin) {
    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  }

  if (isAuthRoute) return;

  if (!isLoggedin && !isPublicRoute) {
    return Response.redirect(new URL(authRoutes.login, nextUrl));
  }

  return;
});

export const config = {
  matcher: [
    // Exclude files with a "." followed by an extension, which are typically static files.
    // Exclude files in the _next directory, which are Next.js internals.
    "/((?!.+\\.[\\w]+$|_next).*)",
    // Re-include any files in the api or trpc folders that might have an extension
    "/(api|trpc)(.*)",
  ],
};
