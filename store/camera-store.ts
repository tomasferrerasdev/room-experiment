import * as THREE from 'three';
import { create } from 'zustand';
interface State {
  epsilon: boolean;
  setEpsilon: (epsilon: boolean) => void;
  position: THREE.Vector3;
  setPosition: (newPos: THREE.Vector3) => void;
  rotation: THREE.Quaternion;
  setRotation: (newRot: THREE.Quaternion) => void;
}

export const useCameraStore = create<State>()((set) => ({
  epsilon: false,
  position: new THREE.Vector3(-0.1, 1.5, 3),
  setPosition(newPos) {
    set({ position: newPos });
  },
  setEpsilon(epsilon) {
    set({ epsilon });
  },
  rotation: new THREE.Quaternion(-0.02, 0, 0),
  setRotation(newRot) {
    set({ rotation: newRot });
  },
}));
