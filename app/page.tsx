'use client';
import { Cursor } from '@/components/Cursor/Cursor';
import { Experience } from '@/components/Experience/Experience';
import { useCameraStore } from '@/store/camera-store';
import { useSceneCursor } from '@/store/scene-cursor';
import { PerspectiveCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import {
  EffectComposer,
  Pixelation,
  Vignette,
} from '@react-three/postprocessing';
import { Suspense } from 'react';
import styles from './page.module.scss';

export default function Home() {
  const { media } = useSceneCursor();

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
        <CustomEffects />
        <CustomCamera />
      </Canvas>
      <Cursor />
      <p className={styles.subtitle}>{media.subtitle && media.subtitle}</p>
    </main>
  );
}

const CustomCamera = () => {
  const { position } = useCameraStore();
  return (
    <>
      <PerspectiveCamera
        makeDefault
        fov={50}
        position={position}
        rotation={[-0.031, 0, 0]}
      />
    </>
  );
};

const CustomEffects = () => {
  return (
    <EffectComposer>
      <Pixelation granularity={4} />
      <Vignette eskil={false} offset={0.1} darkness={1} />
    </EffectComposer>
  );
};

const CustomLights = () => {
  return (
    <>
      <ambientLight color={'#B3DEB2'} intensity={2} />
      <pointLight color="orange" position={[1, 1, -1.8]} intensity={35} />
    </>
  );
};
