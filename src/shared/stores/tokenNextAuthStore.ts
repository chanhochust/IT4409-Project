let cachedToken: string | null = null;
export function setCachedToken(token: string | null) {
  cachedToken = token;
}
export function getCachedToken() {
  return cachedToken;
}
