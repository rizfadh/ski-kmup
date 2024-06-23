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
  postDraft: (id: string) => `/posts/draft/${id}`,
  postEdit: (id: string) => `/posts/edit/${id}`,
  cash: "/cash",
  cashPayment: "/cash/payment",
  cashPaymentStatus: "/cash/payment/status",
  cashPaymentHistory: "/cash/payment/history",
  cashIn: "/cash/in",
  cashOut: "/cash/out",
};

export const authRoutes = {
  login: "/login",
  register: "/register",
};

export const apiAuthPrefix = "/api/auth";

export const DEFAULT_LOGIN_REDIRECT = privateRoutes.dashboard;
