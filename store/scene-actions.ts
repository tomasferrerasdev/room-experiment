import { create } from "zustand";

type ActiveInteraction = {
  id: number;
  name: string;
  audioSrc: string;
  subtitleMessage: string;
};

interface State {
  activeInteraction: ActiveInteraction | null;
  setActive: (interaction: ActiveInteraction | null) => void;
}

export const useSceneActions = create<State>((set) => ({
  activeInteraction: null,
  setActive: (interaction) =>
    set((state) => ({ activeInteraction: interaction })),
}));
