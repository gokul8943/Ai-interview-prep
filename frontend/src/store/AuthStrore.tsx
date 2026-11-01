import { create } from 'zustand';

interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role?: string;
  isVerified?: boolean;
}

interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  user: User | null;
}

const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const cookieValue = parts.pop()?.split(';').shift();
    return cookieValue || null;
  }
  return null;
};

const setCookie = (name: string, value: string, days = 7) => {
  if (typeof document === "undefined") return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
};

const deleteCookie = (name: string) => {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
};

const initialAuthState: AuthState = {
  isAuthenticated: !!(getCookie('user') || localStorage.getItem('user')),
  accessToken: getCookie('accessToken'),
  user: (() => {
    const cookieUser = getCookie('user');
    if (cookieUser) {
      try {
        return JSON.parse(decodeURIComponent(cookieUser));
      } catch {
        return null;
      }
    }
    return JSON.parse(localStorage.getItem('user') || 'null');
  })(),
};

interface AuthStore {
  authState: AuthState;
  login: (accessToken: string, user: User) => void;
  logout: () => void;
  updateUser: (user: User) => void;
  updateAccessToken: (accessToken: string) => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  authState: { ...initialAuthState },
  login: (accessToken: string, user: User) => {
    try {
      localStorage.removeItem('user');
    } catch {}
    setCookie('accessToken', accessToken);
    setCookie('user', encodeURIComponent(JSON.stringify(user)));
    set((state) => ({
      authState: {
        ...state.authState,
        isAuthenticated: true,
        accessToken,
        user,
      },
    }));
  },
  updateUser: (user: User) => {
    try {
      localStorage.removeItem('user');
    } catch {}
    setCookie('user', encodeURIComponent(JSON.stringify(user)));
    set((state) => ({
      authState: {
        ...state.authState,
        user,
      },
    }));
  },
  logout: () => {
    try {
      localStorage.removeItem('user');
    } catch {}
    deleteCookie('accessToken');
    deleteCookie('user');
    set({
      authState: {
        isAuthenticated: false,
        accessToken: null,
        user: null,
      },
    });
  },
  updateAccessToken: (accessToken: string) => {
    setCookie('accessToken', accessToken);
    set((state) => ({
      authState: {
        ...state.authState,
        accessToken,
      },
    }));
  },
}));

export default useAuthStore;
