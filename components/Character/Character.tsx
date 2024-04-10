import { Line, useAnimations, useGLTF } from '@react-three/drei';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

export const Character = (props: any) => {
  const LINE_NB_POINTS = 160;
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(-2.7, 0, -2.2),
        new THREE.Vector3(-2, 0, -2.2),
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

  useEffect(() => {
    function handleKeyPress(event: KeyboardEvent) {
      if (event.key === 'e' && characterProgress < 10) {
        actions['The-Room-Open-Fridge']?.play();
        actions['The-Room-Open-Fridge']!.repetitions = 1;
      }
    }

    window.addEventListener('keypress', handleKeyPress);
    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, [characterProgress]);

  return (
    <>
      <group
        ref={group}
        {...props}
        dispose={null}
        receiveShadow
        position={characterPosition}
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
      <Line points={linePoints} opacity={0} linewidth={0} />
    </>
  );
};

useGLTF.preload('/models/character.glb');
