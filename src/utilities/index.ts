export const isBrowser = typeof window !== 'undefined';
export const isServer = !isBrowser;
export const isIOS = isBrowser && /iPad|iPhone|iPod/.test(navigator.userAgent);
export const isDev = process.env.NODE_ENV !== 'production';
