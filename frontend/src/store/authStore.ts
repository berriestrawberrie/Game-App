import { create } from "zustand";
import { auth } from "../firebase/firebase.init";
import { signOut } from "firebase/auth";
import type { User } from "firebase/auth";

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  loading: true,

  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),

  logout: async () => {
    await signOut(auth);
    set({ user: null, token: null });
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("avatar");
    localStorage.removeItem("userId");
  },
}));
