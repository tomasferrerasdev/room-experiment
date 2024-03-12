import { Line, useAnimations, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

export const Character = (props: any) => {
  const [curPointIndex, setCurPointIndex] = useState(0);
  const group = useRef<any>();
  const { nodes, materials, animations }: any = useGLTF(
    '/models/character.glb'
  );
  const { actions } = useAnimations(animations, group);
  const [isMoving, setIsMoving] = useState(false);

  useFrame((_state, delta) => {
    const speed = isMoving ? 1 : 0.5; // Adjust the damping factor as needed
    const distanceCovered = delta * speed;
    const newPosition = curve.getPointAt(
      (curPointIndex + distanceCovered) / LINE_NB_POINTS
    );
    group.current.position.lerp(newPosition, 0.1); // Adjust the lerp factor as needed
  });

  const handleMove = (event: KeyboardEvent) => {
    if (event.key === 'ArrowLeft') {
      setCurPointIndex((prevIndex) => Math.max(prevIndex - 1, 0));
      actions['Common-Walking']?.play();
      setIsMoving(true);
      group.current.rotation.set(0, -Math.PI / 2, 0);
    } else if (event.key === 'ArrowRight') {
      setCurPointIndex((prevIndex) =>
        Math.min(prevIndex + 1, linePoints.length - 1)
      );
      actions['Common-Walking']?.play();
      setIsMoving(true);
      group.current.rotation.set(0, Math.PI / 2, 0);
    }
  };

  const handleStop = () => {
    setIsMoving(false);
  };

  useEffect(() => {
    document.addEventListener('keydown', handleMove);
    document.addEventListener('keyup', handleStop); // Add event listener for keyup
    return () => {
      document.removeEventListener('keydown', handleMove);
      document.removeEventListener('keyup', handleStop); // Remove event listener on cleanup
    };
  }, []);

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

  return (
    <>
      <group ref={group} {...props} dispose={null} receiveShadow>
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
      <Line points={linePoints} color={'white'} linewidth={3} lineWidth={3} />
    </>
  );
};

useGLTF.preload('/models/character.glb');
