export const clientEnvironment = {
  apiURL: process.env.NEXT_PUBLIC_API_URL,
  apiForAiURL: process.env.NEXT_PUBLIC_API_FOR_AI_URL,
  suppressHydrationWarning: Boolean(process.env.NEXT_PUBLIC_SUPPRESS_HYDRATION_WARNING) ?? false,
  secretNextAuth: process.env.AUTH_SECRET,
};
