import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export const Character = (props: any) => {
  const group = useRef();
  const { nodes, materials, animations }: any = useGLTF(
    "/models/character.glb"
  );
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    actions["Common-Idle"]?.play();
  }, []);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group
          name="Armature"
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
          position={[0, 0, -1.5]}
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
  );
};

useGLTF.preload("/models/character.glb");
