import { useFrame, useThree } from '@react-three/fiber';
import { useState } from 'react';
import * as THREE from 'three';

export function useCameraAnimation() {
  const { camera } = useThree();
  const [isReverse, setIsReverse] = useState(false);
  const [animateCamera, setAnimateCamera] = useState(false);
  const targetPosition = new THREE.Vector3(-1.56, 1.048, -3.7144349607085867);
  const targetRotation = new THREE.Quaternion().setFromEuler(
    new THREE.Euler(-0.335, 1.3, 0.32, 'XYZ')
  );

  useFrame((state) => {
    if (animateCamera) {
      let target;
      if (isReverse) {
        target = new THREE.Vector3(-0.1, 1.3, 3);
        camera.position.lerp(target, 0.02);
        camera.quaternion.copy(
          camera.quaternion.slerp(new THREE.Quaternion(), 0.02)
        );
      } else {
        target = targetPosition;
        camera.position.lerp(targetPosition, 0.02);
        camera.quaternion.copy(camera.quaternion.slerp(targetRotation, 0.02));
      }

      if (camera.position.distanceTo(target) < 0.01) {
        setAnimateCamera(false);
      }
    }
  });

  return { isReverse, setIsReverse, animateCamera, setAnimateCamera };
}
