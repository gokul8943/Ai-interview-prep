import { create } from 'zustand';

interface User {
  id: string;
  username: string;
  email: string;
  fullName?: string;
  avatar?: string;
  role?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  accessToken?: string | null;
  refreshToken?: string | null;
  user: User | null;
}

const initialAuthState: AuthState = {
  isAuthenticated: localStorage.getItem('accessToken') ? true : false,
  accessToken: localStorage.getItem('accessToken'),
  refreshToken: localStorage.getItem('refreshToken'),
  user: JSON.parse(localStorage.getItem('user') || 'null'),
};

interface AuthStore {
  authState: AuthState;
  login: (accessToken: string, user: User, refreshToken: string) => void;
  logout: () => void;
  updateUser: (user: User) => void;
  updateAccessToken: (accessToken: string) => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  authState: { ...initialAuthState },
  login: (accessToken: string, user: User, refreshToken: string) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('user', JSON.stringify(user));
    set((state) => ({
      authState: {
        ...state.authState,
        isAuthenticated: true,
        accessToken,
        refreshToken,
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
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    set({
      authState: {
        ...initialAuthState,
        isAuthenticated: false,
        accessToken: null,
        refreshToken: null,
        user: null,
      },
    });
  },
  updateAccessToken: (accessToken: string) => {
    localStorage.setItem('accessToken', accessToken);
    set((state) => ({
      authState: {
        ...state.authState,
        accessToken,
      },
    }));
  },
}));

export default useAuthStore;