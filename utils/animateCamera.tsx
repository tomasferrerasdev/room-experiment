import { useFrame, useThree } from '@react-three/fiber';
import { useState } from 'react';
import * as THREE from 'three';

interface ITarget {
  position: THREE.Vector3;
  rotation: THREE.Quaternion;
}

export function useCameraAnimation() {
  const { camera } = useThree();
  const [target, setTarget] = useState<ITarget | null>(null);

  useFrame((state) => {
    if (!target) return;
    camera.position.lerp(target.position, 0.02);
    camera.quaternion.copy(camera.quaternion.slerp(target.rotation, 0.02));

    const positionDifference = camera.position.distanceTo(target.position);
    const rotationDifference = camera.quaternion.angleTo(target.rotation);

    if (positionDifference < 0.01 && rotationDifference < 0.01) {
      setTarget(null);
    }
  });

  const startAnimation = (newTarget: {
    position: THREE.Vector3;
    rotation: THREE.Quaternion;
  }) => {
    setTarget(newTarget);
  };

  return { startAnimation };
}
