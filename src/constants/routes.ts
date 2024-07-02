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
  cashManage: "/cash/manage",
  cashManageUser: (id: string) => `/cash/manage/${id}`,
  program: "/program",
  programManage: "/program/manage",
  programManagePlan: "/program/manage/plan",
  programConfirm: "/program/confirm",
  report: "/report",
  reportManage: "/report/manage",
  reportConfirm: "/report/confirm",
  settings: "/settings",
  settingsPosition: "/settings/position",
};

export const authRoutes = {
  login: "/login",
  register: "/register",
};

export const apiAuthPrefix = "/api/auth";

export const DEFAULT_LOGIN_REDIRECT = privateRoutes.dashboard;
