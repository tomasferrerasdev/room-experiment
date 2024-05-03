import { useCameraStore } from '@/store/camera-store';
import { Line, useAnimations, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

export const Character = (props: any) => {
  const LINE_NB_POINTS = 160;
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(-1.5, 0, -4),
        new THREE.Vector3(-1.5, 0, -2.2),
        new THREE.Vector3(0, 0, -1.5),
        new THREE.Vector3(1, 0, -1.5),
        new THREE.Vector3(1.5, 0, -2),
        new THREE.Vector3(1.6, 0, -2.8),
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
  }, []);

  useEffect(() => {
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
        }
      }, 30);
    } else if (movementInterval.current) {
      window.clearInterval(movementInterval.current);
    }

    return () => {
      if (movementInterval.current) {
        window.clearInterval(movementInterval.current);
      }
    };
  }, [isMovingRight, isMovingLeft, characterProgress]);

  const [animate, setAnimate] = useState(false);
  const [cameraTransition, setCameraTransition] = useState(false);
  const { setEpsilon } = useCameraStore();
  useFrame((state) => {
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
        setAnimate(false);
      }
    }

    if (cameraTransition) {
      const elapsedTime = state.clock.getElapsedTime();
      const targetPosition = new THREE.Vector3(-1.63, 1.035, -4.74);
      const epsilon = 0.01;

      state.camera.position.lerp(
        new THREE.Vector3(-0.1, 1.5, 3).lerp(
          new THREE.Vector3(-1.63, 1.035, -4.767),
          elapsedTime * 0.08
        ),
        0.1
      );

      if (state.camera.position.distanceTo(targetPosition) < 1.4) {
        setEpsilon(true);
      }
      if (state.camera.position.distanceTo(targetPosition) < epsilon) {
        setCameraTransition(false);
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
        onClick={() => {
          setAnimate(true);
          setCameraTransition(true);
        }}
      >
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
