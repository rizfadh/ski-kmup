export const publicRoutes = {
  home: "/",
  post: "/post",
  about: "/about",
};

export const privateRoutes = {
  dashboard: "/dashboard",
};

export const authRoutes = {
  login: "/login",
  register: "/register",
};

export const apiAuthPrefix = "/api/auth";

export const DEFAULT_LOGIN_REDIRECT = privateRoutes.dashboard;
