import { useSceneCursor } from '@/store/scene-cursor';
import { useCameraAnimation } from '@/utils/animateCamera';
import { Html, Line, useAnimations, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

export const Character = (props: any) => {
  const { setMedia } = useSceneCursor();
  const { animateCamera, setAnimateCamera, setIsReverse } =
    useCameraAnimation();
  const LINE_NB_POINTS = 160;
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(-1.1, 0, -3.6),
        new THREE.Vector3(-0.5, 0, -3.2),
        new THREE.Vector3(-0.5, 0, -2),
        new THREE.Vector3(-0, 0, -1.5),
        new THREE.Vector3(1, 0, -1.5),
        new THREE.Vector3(1.5, 0, -2),
        new THREE.Vector3(1.6, 0, -2.7),
      ],
      false,
      'catmullrom'
    );
  }, []);

  const linePoints = useMemo(() => {
    return curve.getPoints(LINE_NB_POINTS);
  }, [curve]);

  const group = useRef<any>();
  const { nodes, materials, animations }: any = useGLTF(
    '/models/character.glb'
  );
  const { actions } = useAnimations(animations, group);
  const [characterProgress, setCharacterProgress] = useState(
    LINE_NB_POINTS / 2
  );
  const characterPosition = curve.getPointAt(
    characterProgress / LINE_NB_POINTS
  );
  const [isMovingRight, setIsMovingRight] = useState(false);
  const [isMovingLeft, setIsMovingLeft] = useState(false);
  const [threshold, setThreshold] = useState<null | boolean>(null);
  const movementInterval = useRef<number | null>(null);

  useEffect(() => {
    if (actions['Common-Idle']) {
      actions['Common-Idle'].play();
    }
    console.log(actions);
  }, [actions]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        if (actions['Common-Idle']) {
          actions['Common-Idle'].stop();
        }
        if (actions['Common-Walking']) {
          actions['Common-Walking'].play();
        }
      }
      if (event.key === 'ArrowRight') {
        setIsMovingRight(true);
      } else if (event.key === 'ArrowLeft') {
        setIsMovingLeft(true);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        actions['The-Room-Desk-Code']!.stop();
        if (actions['Common-Walking']) {
          actions['Common-Walking'].stop();
        }
        if (actions['Common-Idle']) {
          actions['Common-Idle'].play();
        }
      }
      if (event.key === 'ArrowRight') {
        setIsMovingRight(false);
      } else if (event.key === 'ArrowLeft') {
        setIsMovingLeft(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [actions]);

  useEffect(() => {
    const handleKeyPress = (event: { key: string }) => {
      if (event.key === 'e') {
        if (!animateCamera) {
          setIsReverse((prevIsReverse) => {
            const newIsReverse = !prevIsReverse;
            setAnimateCamera(true);
            return newIsReverse;
          });
        }
      }
    };

    if (isMovingRight || isMovingLeft) {
      movementInterval.current = window.setInterval(() => {
        let nextPosition;
        if (isMovingRight) {
          nextPosition = Math.min(characterProgress + 1, LINE_NB_POINTS);

          setCharacterProgress((prevProgress) =>
            Math.min(prevProgress + 1, LINE_NB_POINTS)
          );
        } else if (isMovingLeft) {
          nextPosition = Math.max(characterProgress - 1, 0);
          setCharacterProgress((prevProgress) => Math.max(prevProgress - 1, 0));
        }
        if (nextPosition !== undefined) {
          if (nextPosition > characterProgress) {
            group.current.lookAt(
              curve.getPointAt(nextPosition / LINE_NB_POINTS)
            );
          } else if (nextPosition < characterProgress) {
            group.current.lookAt(
              curve.getPointAt(nextPosition / LINE_NB_POINTS)
            );
          }
          const threshold = 2;
          if (nextPosition > threshold) {
            actions['The-Room-Desk-Code']!.stop();
            actions['Common-Walking']!.play();
          }
        }
      }, 30);
    } else if (movementInterval.current) {
      window.clearInterval(movementInterval.current);
      const threshold = 2;
      if (characterProgress <= threshold) {
        actions['Common-Walking']!.stop();
        actions['The-Room-Desk-Code']!.play();
        window.addEventListener('keydown', handleKeyPress);
      }
    }

    return () => {
      if (movementInterval.current) {
        window.clearInterval(movementInterval.current);
        window.removeEventListener('keydown', handleKeyPress);
      }
    };
  }, [
    isMovingRight,
    isMovingLeft,
    characterProgress,
    actions,
    curve,
    setMedia,
    animateCamera,
    setIsReverse,
    setAnimateCamera,
  ]);

  const [animate, setAnimate] = useState(false);

  useFrame(() => {
    if (characterProgress < 2) {
      setThreshold(true);
    } else {
      setThreshold(false);
    }
    if (animate) {
      if (characterProgress > 0) {
        setCharacterProgress((prevProgress) => {
          const nextProgress = Math.max(prevProgress - 0.5, 0);
          group.current.lookAt(curve.getPointAt(nextProgress / LINE_NB_POINTS));
          return nextProgress;
        });
        actions['Common-Walking']!.play();
      } else {
        actions['Common-Walking']!.stop();
        actions['The-Room-Desk-Code']!.play();
      }
    }
  });

  return (
    <>
      <group
        ref={group}
        {...props}
        dispose={null}
        receiveShadow
        position={characterPosition}
      >
        {threshold && (
          <Html position={[0, 2.1, 0]}>
            <div className="helperTextCharacter">
              <svg
                width="27"
                height="28"
                viewBox="0 0 27 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.735 3.90291H5.27637C4.48663 3.90291 3.84569 4.54386 3.84569 5.3336V22.147C3.84569 22.9368 4.48663 23.5777 5.27637 23.5777H21.7464C22.5362 23.5777 23.1771 22.9368 23.1771 22.147V5.3336C23.1771 4.54386 22.5362 3.90291 21.735 3.90291ZM13.4828 17.008H6.27213V5.89443H13.4256V7.94317H9.03049V10.4268H12.8075V12.487H9.03049V14.9707H13.4713V17.008H13.4828ZM24.4361 0H2.57524C1.15599 0 0 1.15599 0 2.58668V24.9054C0 26.3361 1.15599 27.4806 2.57524 27.4806H24.4247C25.8554 27.4806 26.9999 26.3246 26.9999 24.9054V2.58668C27.0114 1.15599 25.8554 0 24.4361 0ZM24.1958 22.1585C24.1958 23.509 23.097 24.6078 21.7464 24.6078H5.27637C3.9258 24.6078 2.82704 23.509 2.82704 22.1585V5.3336C2.82704 3.98303 3.9258 2.88426 5.27637 2.88426H21.7464C23.097 2.88426 24.1958 3.98303 24.1958 5.3336V22.1585Z"
                  fill="#E9E9E9"
                />
              </svg>
            </div>
          </Html>
        )}
        <group name="Scene">
          <group
            name="Armature"
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.01}
            position={[0, 0, 0]}
          >
            <primitive object={nodes.mixamorigHips} />
          </group>

          <group name="Teodoro" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
            <skinnedMesh
              name="Teodoro001"
              geometry={nodes.Teodoro001.geometry}
              material={materials.PaletteMaterial002}
              skeleton={nodes.Teodoro001.skeleton}
            />
            <skinnedMesh
              name="Teodoro001_1"
              geometry={nodes.Teodoro001_1.geometry}
              material={materials.PaletteMaterial003}
              skeleton={nodes.Teodoro001_1.skeleton}
            />
            <skinnedMesh
              name="Teodoro001_3"
              geometry={nodes.Teodoro001_3.geometry}
              material={materials.BODY}
              skeleton={nodes.Teodoro001_3.skeleton}
            />
            <skinnedMesh
              name="Teodoro001_4"
              geometry={nodes.Teodoro001_4.geometry}
              material={materials.SKIN}
              skeleton={nodes.Teodoro001_4.skeleton}
            />
            <skinnedMesh
              name="Teodoro001_5"
              geometry={nodes.Teodoro001_5.geometry}
              material={materials.PaletteMaterial005}
              skeleton={nodes.Teodoro001_5.skeleton}
            />
          </group>
        </group>
      </group>
      <Line points={linePoints} opacity={0} linewidth={1} />
    </>
  );
};
