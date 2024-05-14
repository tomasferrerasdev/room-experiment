import { create } from 'zustand';

interface State {
  isLoaded: boolean;

  setIsLoaded: (load: boolean) => void;
}

export const useLoadingStore = create<State>((set) => ({
  isLoaded: false,
  setIsLoaded(load) {
    set({ isLoaded: load });
  },
}));
