import { create } from "zustand";
import { auth } from "../firebase/firebase.init";
import { signOut } from "firebase/auth";
import type { User } from "firebase/auth";

interface AuthState {
  user: User | null;
  token: string | null;
  // Indicates whether Firebase is still determining the auth state
  authLoading: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setAuthLoading: (loading: boolean) => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,

  // Start as "loading" until Firebase tells us the auth state
  authLoading: true,
  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),
  setAuthLoading: (loading) => set({ authLoading: loading }),

  logout: async () => {
    await signOut(auth);
    set({ user: null, token: null });
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("avatar");
    localStorage.removeItem("userId");
  },
}));
