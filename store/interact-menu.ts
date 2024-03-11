import { create } from "zustand";

interface State {
  isMenuActive: boolean;
  openMenu: () => void;
  closeMenu: () => void;
}

export const useMenu = create<State>((set) => ({
  isMenuActive: false,
  openMenu: () => set((state) => ({ isMenuActive: true })),
  closeMenu: () => set((state) => ({ isMenuActive: false })),
}));
