import { create } from "zustand";

interface State {
  isHover: boolean;
  hoverMessage: string | null;
  setIsHoverOn: (message: string) => void;
  setIsHoverOff: () => void;
}

export const useSceneCursor = create<State>()((set) => ({
  isHover: false,
  hoverMessage: null,
  setIsHoverOn: (message) =>
    set((state) => ({ isHover: true, hoverMessage: message })),
  setIsHoverOff: () => set((state) => ({ isHover: false, hoverMessage: null })),
}));
