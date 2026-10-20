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

const initialAuthState: AuthState = {
  isAuthenticated: !!localStorage.getItem('user'),
  accessToken: null,
  user: JSON.parse(localStorage.getItem('user') || 'null'),
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
    localStorage.setItem('user', JSON.stringify(user));
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
    localStorage.setItem('user', JSON.stringify(user));
    set((state) => ({
      authState: {
        ...state.authState,
        user,
      },
    }));
  },
  logout: () => {
    localStorage.removeItem('user');
    set({
      authState: {
        isAuthenticated: false,
        accessToken: null,
        user: null,
      },
    });
  },
  updateAccessToken: (accessToken: string) => {
    set((state) => ({
      authState: {
        ...state.authState,
        accessToken,
      },
    }));
  },
}));

export default useAuthStore;
