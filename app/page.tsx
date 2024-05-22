'use client';
import { Cursor } from '@/components/Cursor/Cursor';
import { Experience } from '@/components/Experience/Experience';
import { LoadingScreen } from '@/components/LoadingScreen/LoadingScreen';
import { Subtitles } from '@/components/Subtitles/Subtitles';
import { PerformanceMonitor, PerspectiveCamera } from '@react-three/drei';
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
  const [isConfigSet, setIsConfigSet] = useState(false);
  const [performanceConfig, setPerformanceConfig] = useState({
    dpr: 1,
    pixelation: 4,
  });

  console.log(
    "%cHey! how curious you are 👀, if you want to check out the code here's the link: https://github.com/tomasferrerasdev/folio-2k24",
    'color:#fff; background: #000; font-size: 1.2rem; padding: 0.15rem0.25rem; margin: 1rem; font-family: Helvetica; padding: 4px; border-radius: 4px; font-weight: bold; text-shadow: 1px 1px 1px #0a0121;'
  );
  return (
    <main className={`${styles.main}`}>
      <Canvas
        shadows
        dpr={performanceConfig.dpr}
        camera={{
          fov: 40,
        }}
      >
        <Suspense>
          <Experience />
        </Suspense>
        <CustomLights />
        <CustomCamera />
        <CustomEffects granularity={performanceConfig.pixelation} />
        <PerformanceMonitor
          onIncline={() => {
            if (!isConfigSet) {
              setPerformanceConfig({
                dpr: 1,
                pixelation: 4,
              });
              setIsConfigSet(true);
            }
          }}
          onDecline={() => {
            if (!isConfigSet) {
              setPerformanceConfig({
                dpr: 0.7,
                pixelation: 3,
              });
              setIsConfigSet(true);
            }
          }}
        />
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

const CustomEffects = ({ granularity }: { granularity: number }) => {
  return (
    <EffectComposer>
      <Pixelation granularity={granularity} />
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
      <ambientLight color={'#B3DEB2'} intensity={0.9} />
      <pointLight color="orange" position={[0.8, 1.7, -2.5]} intensity={8} />
    </>
  );
};
