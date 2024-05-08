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
  setMedia: (subtitle: string, audioSrc: string) => void;
}

export const useSceneCursor = create<State>()((set) => ({
  isHover: false,
  hoverMessage: null,
  media: {
    subtitle: null,
    audio: null,
  },
  setIsHoverOn: (message) =>
    set((state) => ({ isHover: true, hoverMessage: message })),
  setIsHoverOff: () => set((state) => ({ isHover: false, hoverMessage: null })),
  setMedia: (subtitle, audioSrc) => {
    const audio = new Audio(audioSrc);
    audio.play();
    set((state) => ({ media: { subtitle, audio } }));
    audio.onended = () => {
      set((state) => ({ media: { subtitle: null, audio: null } }));
    };
  },
}));
