'use client';
import { Cursor } from '@/components/Cursor/Cursor';
import { Experience } from '@/components/Experience/Experience';
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
    </main>
  );
}

const CustomCamera = () => {
  // position={[-1.63, 1.035, -5.138]}
  // rotation={[-0.031, -0, 0]}

  //  position={[-1.78, 1.035, -5.15]}
  //  rotation={[-0.04, 0.19, 0.006]}

  return (
    <>
      <PerspectiveCamera
        makeDefault
        fov={45}
        position={[-1.63, 1.035, -5.138]}
        rotation={[-0.031, -0, 0]}
      />
    </>
  );
};

const CustomEffects = () => {
  return (
    <EffectComposer>
      <Pixelation granularity={3} />
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
