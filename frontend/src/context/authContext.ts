import { create } from "zustand";

type Store = {
  isAuth: boolean;
  setIsAuth: (value: boolean) => void;
};

export const useAuthStore = create<Store>((set) => ({
  isAuth:
    localStorage.getItem("user:auth") &&
    localStorage.getItem("user:auth") == "true"
      ? true
      : false,
  setIsAuth: (value: boolean) => set(() => ({ isAuth: value })),
}));
