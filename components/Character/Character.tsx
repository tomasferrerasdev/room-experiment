import { useCameraAnimation } from '@/utils/animateCamera';
import { Html, Line, useAnimations, useGLTF } from '@react-three/drei';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

export const Character = (props: any) => {
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
  const movementInterval = useRef<number | null>(null);

  useEffect(() => {
    if (actions['Common-Idle']) {
      actions['Common-Idle'].play();
      console.log(actions);
    }
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
        setIsReverse((prevIsReverse) => {
          const newIsReverse = !prevIsReverse;
          setAnimateCamera(true);
          return newIsReverse;
        });
      }
    };

    if (isMovingRight || isMovingLeft) {
      movementInterval.current = window.setInterval(() => {
        let nextPosition;
        if (isMovingRight) {
          nextPosition = Math.min(characterProgress + 1.7, LINE_NB_POINTS);

          setCharacterProgress((prevProgress) =>
            Math.min(prevProgress + 1.7, LINE_NB_POINTS)
          );
        } else if (isMovingLeft) {
          nextPosition = Math.max(characterProgress - 1.7, 0);
          setCharacterProgress((prevProgress) =>
            Math.max(prevProgress - 1.7, 0)
          );
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
    animateCamera,
    setIsReverse,
    setAnimateCamera,
  ]);

  // const [animate, setAnimate] = useState(false);

  // useFrame(() => {
  //   if (animate) {
  //     if (characterProgress > 0) {
  //       setCharacterProgress((prevProgress) => {
  //         const nextProgress = Math.max(prevProgress - 0.5, 0);
  //         group.current.lookAt(curve.getPointAt(nextProgress / LINE_NB_POINTS));
  //         return nextProgress;
  //       });
  //       actions['Common-Walking']!.play();
  //     } else {
  //       actions['Common-Walking']!.stop();
  //       actions['The-Room-Desk-Code']!.play();
  //     }
  //   }
  // });

  return (
    <>
      <group
        ref={group}
        {...props}
        dispose={null}
        receiveShadow
        position={characterPosition}
      >
        {characterProgress < 2 && (
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
        {characterProgress > 2 && (
          <Html position={[0, 2.1, 0]}>
            <div className="helperTextCharacter helperKeys">
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.1473 3.97029H5.37423C4.56726 3.97029 3.91063 4.62647 3.91063 5.43307V22.5671C3.91063 23.3739 4.56681 24.0305 5.37423 24.0305H22.1473C22.9541 24.0305 23.6108 23.3743 23.6108 22.5671V5.43307C23.6102 4.62647 22.9541 3.97029 22.1473 3.97029ZM5.59216 9.98727L11.1715 5.69887C11.2131 5.66637 11.2623 5.65093 11.3105 5.65093C11.358 5.65093 11.4061 5.66637 11.4472 5.69724C11.5292 5.75734 11.5599 5.86672 11.5225 5.962L10.4003 8.80268H16.9747C17.1001 8.80268 17.2033 8.90419 17.202 9.03011V11.3066C17.2024 11.4319 17.1001 11.5332 16.9742 11.534L10.3998 11.5332L11.5217 14.3741C11.559 14.469 11.5281 14.5778 11.4464 14.6396C11.3643 14.7012 11.252 14.7012 11.1706 14.6387L5.59209 10.3485C5.53599 10.3049 5.50305 10.2381 5.50305 10.1674C5.50312 10.0965 5.53644 10.03 5.59216 9.98727ZM24.8919 0H2.62957C1.17762 0 0 1.17754 0 2.62935V25.3701C0 26.8225 1.17762 28 2.62957 28H24.8922C26.3443 28 27.5218 26.8225 27.5218 25.3701V2.62935C27.5217 1.17754 26.3443 0 24.8919 0ZM24.6473 22.5671C24.6473 23.9452 23.5259 25.0671 22.1473 25.0671H5.37423C3.99596 25.0671 2.874 23.9456 2.874 22.5671V5.43307C2.874 4.05518 3.99552 2.93329 5.37423 2.93329H22.1473C23.5254 2.93329 24.6473 4.05481 24.6473 5.43307V22.5671Z"
                  fill="white"
                />
              </svg>
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.37445 3.97029H22.1475C22.9545 3.97029 23.6111 4.62647 23.6111 5.43307V22.5671C23.6111 23.3739 22.9549 24.0305 22.1475 24.0305H5.37445C4.56763 24.0305 3.911 23.3743 3.911 22.5671V5.43307C3.91152 4.62647 4.56763 3.97029 5.37445 3.97029ZM21.9296 9.98727L16.3503 5.69887C16.3086 5.66637 16.2594 5.65093 16.2113 5.65093C16.1638 5.65093 16.1156 5.66637 16.0745 5.69724C15.9926 5.75734 15.9618 5.86672 15.9992 5.962L17.1215 8.80268H10.5471C10.4217 8.80268 10.3184 8.90419 10.3198 9.03011V11.3066C10.3193 11.4319 10.4217 11.5332 10.5475 11.534L17.122 11.5332L16 14.3741C15.9628 14.469 15.9936 14.5778 16.0753 14.6396C16.1574 14.7012 16.2698 14.7012 16.3512 14.6387L21.9297 10.3485C21.9858 10.3049 22.0187 10.2381 22.0187 10.1674C22.0186 10.0965 21.9853 10.03 21.9296 9.98727ZM2.62987 0H24.8922C26.3441 0 27.5218 1.17754 27.5218 2.62935V25.3701C27.5218 26.8225 26.3441 28 24.8922 28H2.62957C1.17747 28 4.20644e-06 26.8225 4.20644e-06 25.3701V2.62935C7.84105e-05 1.17754 1.17747 0 2.62987 0ZM2.87445 22.5671C2.87445 23.9452 3.99589 25.0671 5.37445 25.0671H22.1475C23.5258 25.0671 24.6478 23.9456 24.6478 22.5671V5.43307C24.6478 4.05518 23.5262 2.93329 22.1475 2.93329H5.37445C3.99634 2.93329 2.87445 4.05481 2.87445 5.43307V22.5671Z"
                  fill="white"
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
      <Line points={linePoints} opacity={0} linewidth={0} />
    </>
  );
};
