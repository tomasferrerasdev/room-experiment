'use client';
import { Cursor } from '@/components/Cursor/Cursor';
import { Experience } from '@/components/Experience/Experience';
import { InteractionMenu } from '@/components/InteractionMenu/InteractionMenu';
import { useSceneStore } from '@/store/scene-store';
import { PerspectiveCamera } from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber';
import {
  EffectComposer,
  Pixelation,
  Vignette,
} from '@react-three/postprocessing';
import { useControls } from 'leva';
import { Perf } from 'r3f-perf';
import { Suspense, useEffect } from 'react';
import * as THREE from 'three';
import styles from './page.module.scss';

export default function Home() {
  return (
    <main className={styles.main}>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{
          fov: 40,
        }}
      >
        <Suspense fallback={null}>
          <Experience />
        </Suspense>
        <CustomLights />
        <CustomCamera />
        <CustomEffects />
        <Perf position="top-left" />
        <gridHelper />
      </Canvas>
      <InteractionMenu />
      <Cursor />
    </main>
  );
}

const CustomCamera = () => {
  const { camera } = useThree();
  const { scene } = useSceneStore();
  const { positionX, positionY, positionZ } = useControls({
    positionX: { value: 0, step: 0.1 },
    positionY: { value: scene.cameraConfig.position[1], step: 0.1 },
    positionZ: { value: scene.cameraConfig.position[2], step: 0.1 },
  });

  useEffect(() => {
    camera.position.set(positionX, positionY, positionZ);
  }, [camera, positionX, positionY, positionZ]);

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'e') {
      const { scene, setScene } = useSceneStore.getState();

      if (scene.interactMenu.exit) {
        setScene({
          quote: '',
          soundSrc: '',
          cameraConfig: {
            position: [0, 1.4, 4],
            rotation: [0, 0, 0],
          },
          interactMenu: {
            previousTrack: false,
            exit: false,
            nextTrack: false,
          },
        });
      }
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      <PerspectiveCamera
        makeDefault
        fov={35}
        position={new THREE.Vector3(...scene.cameraConfig.position)}
        rotation={[...scene.cameraConfig.rotation] as [number, number, number]}
      />
    </>
  );
};

const CustomEffects = () => {
  return (
    <EffectComposer>
      <Pixelation granularity={3} />
      <Vignette eskil={false} offset={0.1} darkness={1.2} />
    </EffectComposer>
  );
};

const CustomLights = () => {
  return (
    <>
      <ambientLight color={'#B3DEB2'} intensity={2} />
      <pointLight color="orange" position={[1, 1, -1.8]} intensity={10} />
    </>
  );
};
