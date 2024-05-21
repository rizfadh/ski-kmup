export const publicRoutes = {
  home: "/",
  posts: "/posts",
  about: "/about",
  postDetail: (id: string) => `/posts/${id}`,
};

export const privateRoutes = {
  dashboard: "/dashboard",
  registrations: "/registrations",
  advices: "/advices",
  postsNew: "/posts/new",
  postsManage: "/posts/manage",
  postDraft: (id: string) => `posts/draft/${id}`,
};

export const authRoutes = {
  login: "/login",
  register: "/register",
};

export const apiAuthPrefix = "/api/auth";

export const DEFAULT_LOGIN_REDIRECT = privateRoutes.dashboard;
