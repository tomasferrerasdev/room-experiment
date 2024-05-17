'use client';
import { Cursor } from '@/components/Cursor/Cursor';
import { Experience } from '@/components/Experience/Experience';
import { LoadingScreen } from '@/components/LoadingScreen/LoadingScreen';
import { Subtitles } from '@/components/Subtitles/Subtitles';
import { PerspectiveCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import {
  Bloom,
  EffectComposer,
  Pixelation,
  Vignette,
} from '@react-three/postprocessing';
import { Suspense, useState } from 'react';
import * as THREE from 'three';
import styles from './page.module.scss';

export default function Home() {
  const [dpr, setDpr] = useState(0.9);
  console.log(
    '%cDinosaurs are Awesome 🦖',
    'color:#1cce69; background: #3d09bf; font-size: 1.5rem; padding: 0.15rem0.25rem; margin: 1rem; font-family: Helvetica; border: 2px solid#1cce69; border-radius: 4px; font-weight: bold; text-shadow: 1px 1px 1px #0a0121; font-style: italic;'
  );
  return (
    <main className={styles.main}>
      <Canvas
        shadows
        dpr={dpr}
        camera={{
          fov: 40,
        }}
      >
        <Suspense fallback={'loading'}>
          <Experience />
        </Suspense>
        <CustomLights />
        <CustomCamera />
        <CustomEffects />
      </Canvas>
      <LoadingScreen />
      <Subtitles />
      <Cursor />
    </main>
  );
}

const CustomCamera = () => {
  return (
    <>
      <PerspectiveCamera
        makeDefault
        fov={50}
        position={new THREE.Vector3(-0.1, 1.3, 3)}
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
