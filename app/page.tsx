"use client";
import { Canvas, useThree } from "@react-three/fiber";
import styles from "./page.module.scss";
import { PerspectiveCamera } from "@react-three/drei";
import { BlendFunction } from "postprocessing";
import { Suspense, useEffect } from "react";
import {
  DotScreen,
  EffectComposer,
  Pixelation,
  Vignette,
} from "@react-three/postprocessing";
import { Perf } from "r3f-perf";
import { Cursor } from "@/components/Cursor/Cursor";
import { Experience } from "@/components/Experience/Experience";
import { useControls } from "leva";
import { InteractionMenu } from "@/components/InteractionMenu/InteractionMenu";
import { useSceneStore } from "@/store/scene-store";
import * as THREE from "three";

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
        <ambientLight color={"#B3DEB2"} intensity={6} />
        <CustomCamera />
        <Perf position="top-left" />
        <EffectComposer>
          <Pixelation granularity={1} />
          <Vignette eskil={false} offset={0.2} darkness={1.2} />
          <DotScreen scale={1} blendFunction={BlendFunction.LIGHTEN} />
        </EffectComposer>
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
    positionX: { value: 0, step: 0.1, min: -1.8, max: 0.9 },
    positionY: { value: 1.4, step: 0.1 },
    positionZ: { value: 3.3, step: 0.1 },
  });

  useEffect(() => {
    camera.position.set(positionX, positionY, positionZ);
  }, [camera, positionX, positionY, positionZ]);

  return (
    <PerspectiveCamera
      makeDefault
      fov={40}
      position={new THREE.Vector3(...scene.cameraConfig.position)}
      rotation={new THREE.Euler(...scene.cameraConfig.lookAt)}
    />
  );
};

// const WalkPath = () => {
//   const LINE_NB_POINTS = 42;
//   const curve = useMemo(() => {
//     return new THREE.CatmullRomCurve3(
//       [new THREE.Vector3(1, 0.2, -1.5), new THREE.Vector3(-2, 0.2, -1.5)],
//       false,
//       "catmullrom",
//       0.5
//     );
//   }, []);

//   const linePoints = useMemo(() => {
//     return curve.getPoints(LINE_NB_POINTS);
//   }, [curve]);

//   return (
//     <Line points={linePoints} color={"white"} linewidth={6} lineWidth={6} />
//   );
// };
