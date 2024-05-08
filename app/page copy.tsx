'use client';
import { Cursor } from '@/components/Cursor/Cursor';
import { Experience } from '@/components/Experience/Experience';
import { useCameraStore } from '@/store/camera-store';
import { useSceneCursor } from '@/store/scene-cursor';
import { Line, PerspectiveCamera } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  Bloom,
  EffectComposer,
  Pixelation,
  Vignette,
} from '@react-three/postprocessing';
import { Suspense, useMemo, useState } from 'react';
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
        {/* <CustomEffects /> */}
      </Canvas>
      <Cursor />
      <p className={styles.subtitle}>{media.subtitle && media.subtitle}</p>
    </main>
  );
}

const CustomCamera = () => {
  const { position, setPosition } = useCameraStore();

  const LINE_NB_POINTS_CAMERA = 160;
  const curveCamera = useMemo(() => {
    return new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(
          -1.5748703155654054,
          1.0444925503406188,
          -3.710071644476462
        ),
        new THREE.Vector3(-0.5, 0.7, -3.3),
        new THREE.Vector3(-0.5, 0.7, -2),
        new THREE.Vector3(0, 1, -1.5),
        new THREE.Vector3(0, 1, 2),
      ],
      false,
      'catmullrom'
    );
  }, []);

  const linePoints = useMemo(() => {
    return curveCamera.getPoints(LINE_NB_POINTS_CAMERA);
  }, [curveCamera]);
  const [characterProgress, setCharacterProgress] = useState(160);
  const characterPosition = curveCamera.getPointAt(
    characterProgress / LINE_NB_POINTS_CAMERA
  );
  const { camera } = useThree();
  useFrame(() => {
    if (characterProgress > 0) {
      setCharacterProgress((prevProgress) =>
        Math.min(prevProgress - 1, LINE_NB_POINTS_CAMERA)
      );
      camera.lookAt(
        curveCamera.getPointAt(
          Math.max(characterProgress - 1, 0) / LINE_NB_POINTS_CAMERA
        )
      );
    } else {
      camera.rotation.set(
        0.003547186738631879,
        1.35,
        -0.0011405368189660338,
        'XYZ'
      );
    }
  });
  return (
    <>
      <PerspectiveCamera makeDefault fov={50} position={characterPosition} />
      <Line points={linePoints} opacity={1} linewidth={1} />
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
