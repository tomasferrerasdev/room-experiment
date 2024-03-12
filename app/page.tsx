<<<<<<< HEAD
"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import styles from "./page.module.scss";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef } from "react";
import {
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
=======
import Image from 'next/image';
import styles from './page.module.css';
>>>>>>> 51ee428cc46d3b62a1f679af6c07542b1ce5e5c1

export default function Home() {
  return (
    <main className={styles.main}>
<<<<<<< HEAD
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
=======
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>app/page.tsx</code>
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className={styles.grid}>
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Docs <span>-&gt;</span>
          </h2>
          <p>Find in-depth information about Next.js features and API.</p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Learn <span>-&gt;</span>
          </h2>
          <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Templates <span>-&gt;</span>
          </h2>
          <p>Explore starter templates for Next.js.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Deploy <span>-&gt;</span>
          </h2>
          <p>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
>>>>>>> 51ee428cc46d3b62a1f679af6c07542b1ce5e5c1
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
    if (event.key === "e") {
      const { scene, setScene } = useSceneStore.getState();

      if (scene.interactMenu.exit) {
        setScene({
          quote: "",
          soundSrc: "",
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
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
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
      <ambientLight color={"#B3DEB2"} intensity={2} />
      <pointLight color="orange" position={[1, 1, -1.8]} intensity={10} />
    </>
  );
};
