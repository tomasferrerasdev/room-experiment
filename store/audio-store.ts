import { Howl } from 'howler';
import { create } from 'zustand';

interface State {
  startPlaying: boolean;
  setStartPlaying: (value: boolean) => void;
  volume: number;
  setVolume: (volume: number) => void;
}

const sound2 = new Howl({
  src: ['/audio/computer-start.m4a'],
});

export const useAudioStore = create<State>((set, get) => ({
  startPlaying: false,
  volume: 0.2,
  setVolume(volume) {
    set({ volume });
  },
  setStartPlaying(value) {
    set({ startPlaying: value });
    if (get().startPlaying) {
      sound2.volume(get().volume);
      sound2.play();
    }
  },
}));
