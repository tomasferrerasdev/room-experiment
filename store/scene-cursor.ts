import { create } from 'zustand';

interface Media {
  subtitle: string | null;
  audio: HTMLAudioElement | null;
}

interface State {
  isHover: boolean;
  hoverMessage: string | null;
  media: Media;
  setIsHoverOn: (message: string) => void;
  setIsHoverOff: () => void;
}

export const useSceneCursor = create<State>()((set, get) => ({
  isHover: false,
  hoverMessage: null,
  media: {
    subtitle: null,
    audio: null,
  },
  setIsHoverOn: (message) =>
    set((state) => ({ isHover: true, hoverMessage: message })),
  setIsHoverOff: () => set((state) => ({ isHover: false, hoverMessage: null })),
}));
