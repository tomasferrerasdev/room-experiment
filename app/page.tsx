"use client";
import { Canvas, useThree } from "@react-three/fiber";
import styles from "./page.module.css";
import { Line, OrbitControls } from "@react-three/drei";
import { BlendFunction } from "postprocessing";
import { Scene } from "@/components/Scene";
import { Suspense, useEffect, useMemo, useState } from "react";
import {
  DotScreen,
  EffectComposer,
  Pixelation,
  Vignette,
} from "@react-three/postprocessing";
import { Character } from "@/components/Character";
import { Perf } from "r3f-perf";
import * as THREE from "three";
import { Cursor } from "@/components/Cursor/Cursor";

const LINE_NB_POINTS = 42;

export default function Home() {
  const [isHover, setIsHover] = useState(false);

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
          <Scene setIsHover={setIsHover} />
          <Character />
        </Suspense>
        <CustomLightning />
        <CustomCamera />
        <Effects />
        <Perf />
      </Canvas>
      <Cursor isHover={isHover} />
    </main>
  );
}

const CustomCamera = () => {
  const { camera } = useThree();
  return <OrbitControls />;
};

const CustomLightning = () => {
  return <ambientLight color={"#B3DEB2"} intensity={6} />;
};

const Effects = () => {
  return (
    <EffectComposer>
      <Pixelation granularity={3} />
      <Vignette eskil={false} offset={0.3} darkness={1.2} />
      <DotScreen scale={1} blendFunction={BlendFunction.LIGHTEN} />
    </EffectComposer>
  );
};

const WalkPath = () => {
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(
      [new THREE.Vector3(1, 0.2, -1.5), new THREE.Vector3(-2, 0.2, -1.5)],
      false,
      "catmullrom",
      0.5
    );
  }, []);

  const linePoints = useMemo(() => {
    return curve.getPoints(LINE_NB_POINTS);
  }, [curve]);

  return (
    <Line points={linePoints} color={"white"} linewidth={6} lineWidth={6} />
  );
};
