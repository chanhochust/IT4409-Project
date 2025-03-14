export const clientEnvironment = {
  apiURL: process.env.NEXT_PUBLIC_API_URL,
  suppressHydrationWarning: Boolean(process.env.NEXT_PUBLIC_SUPPRESS_HYDRATION_WARNING) ?? false,
};
