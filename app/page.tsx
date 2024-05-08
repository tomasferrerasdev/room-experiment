'use client';
import { Cursor } from '@/components/Cursor/Cursor';
import { Experience } from '@/components/Experience/Experience';
import { useSceneCursor } from '@/store/scene-cursor';
import { PerspectiveCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import {
  Bloom,
  EffectComposer,
  Pixelation,
  Vignette,
} from '@react-three/postprocessing';
import { Suspense } from 'react';
import * as THREE from 'three';
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
        <CustomCamera />
        <CustomEffects />
      </Canvas>
      <Cursor />
      <p className={styles.subtitle}>{media.subtitle && media.subtitle}</p>
    </main>
  );
}

const CustomCamera = () => {
  return (
    <>
      <PerspectiveCamera
        makeDefault
        fov={50}
        position={new THREE.Vector3(-0.1, 1.5, 3)}
      />
    </>
  );
};
const CustomEffects = () => {
  return (
    <EffectComposer>
      <Pixelation granularity={4} />
      <Vignette eskil={false} offset={0.1} darkness={1} />
      <Bloom
        luminanceThreshold={0}
        mipmapBlur
        luminanceSmoothing={0}
        intensity={0.1}
      />
    </EffectComposer>
  );
};

const CustomLights = () => {
  return (
    <>
      <ambientLight color={'#B3DEB2'} intensity={0.4} />
      <pointLight color="orange" position={[0.8, 1.7, -2.5]} intensity={8} />
    </>
  );
};
