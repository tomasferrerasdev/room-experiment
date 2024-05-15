import { create } from 'zustand';

const clickableData = [
  {
    id: 1,
    text: 'Doom',
    subtitleText:
      "Playing Doom! My therapy session, because sometimes all you need is a shotgun and some demon-splattering. Let's go to the computer and unleash the chaos on the screen!",
    mediaPath: '/audio/doom.mp3',
  },
  {
    id: 2,
    text: 'Computer',
    subtitleText:
      'Computers are like air conditioning they work fine until you start opening windows',
    mediaPath: '/audio/computer.mp3',
  },
  {
    id: 3,
    text: 'Go to the park',
    subtitleText:
      'How I long for a stroll in the park and  breathe in the fresh air. Yet, Tomas has not yet mastered the art of developing this part, maybe he do it soon.',
    mediaPath: '/audio/park.mp3',
  },
];

interface Item {
  id: number;
  text: string;
  subtitleText: string;
  mediaPath: string;
}

interface State {
  hoverItem: Item | null;
  playingItem: Item | null;
  isPlaying: boolean;
  setHoverItem: (id: number | null) => void;
  playAudio: () => void;
}

export const useCursorStore = create<State>((set, get) => ({
  hoverItem: null,
  playingItem: null,
  isPlaying: false,
  setHoverItem(id) {
    if (id === null) {
      set({ hoverItem: null });
    } else {
      set({ hoverItem: clickableData.find((item) => item.id === id) || null });
    }
  },
  playAudio() {
    const { hoverItem } = get();
    if (hoverItem) {
      const audio = new Audio(hoverItem.mediaPath);
      audio.play();
      set({ isPlaying: true, playingItem: hoverItem });
      audio.onended = () => {
        set({ isPlaying: false, playingItem: null });
      };
    }
  },
}));
