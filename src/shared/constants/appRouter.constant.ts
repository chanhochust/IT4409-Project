export const AppRouter = {
  home: '/',
  login: '/login',
  register: '/register',
  forgotPassword: '/forgot-password',
  resetPassword: '/forgot-password/reset',
  dashboard: '/products',
  chat: '/chat',
  products: '/products',
  productDetail: (id: string) => `/products/${id}`,
  cart: '/cart',
  orders: '/orders',
};
