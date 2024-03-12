import { create } from "zustand";

type CameraType = {
  position: number[];
  rotation: number[];
};

type InteractMenuType = {
  previousTrack: boolean;
  exit: boolean;
  nextTrack: boolean;
};

interface IScene {
  quote: string;
  soundSrc: string;
  cameraConfig: CameraType;
  interactMenu: InteractMenuType;
}

interface SceneStore {
  scene: IScene;
  setScene: (newScene: Partial<IScene>) => void;
}

export const useSceneStore = create<SceneStore>((set) => ({
  scene: {
    quote: "",
    soundSrc: "",
    cameraConfig: {
      position: [0, 1.4, 4],
      rotation: [0, 0, 0],
    },
    interactMenu: {
      previousTrack: false,
      exit: false,
      nextTrack: false,
    },
  },
  setScene: (newScene) =>
    set((state) => ({ scene: { ...state.scene, ...newScene } })),
}));
