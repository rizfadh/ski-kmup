import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import {
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  privateRoutes,
} from "@/constants/routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedin = !!req.auth;

  const isPrivateRoute = Object.values(privateRoutes).includes(
    nextUrl.pathname,
  );
  const isAuthRoute = Object.values(authRoutes).includes(nextUrl.pathname);

  if (isLoggedin && isAuthRoute) {
    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  }

  if (!isLoggedin && isPrivateRoute) {
    return Response.redirect(new URL(authRoutes.login, nextUrl));
  }
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
