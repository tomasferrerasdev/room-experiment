import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export const Scene = ({ setIsHover }: any) => {
  const group = useRef<any>();
  const { nodes, materials, animations }: any = useGLTF("/models/office.glb");
  const { actions } = useAnimations(animations, group);
  useEffect(() => {
    actions["Cat-Clock-Loop"]?.play();
  }, []);
  return (
    <group ref={group} dispose={null}>
      <group name="Scene">
        <group name="Vert" />
        <mesh
          name="Table001"
          castShadow
          receiveShadow
          geometry={nodes.Table001.geometry}
          material={materials.mt_assets}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[1, 0.8, 1]}
        />
        <mesh
          name="Table"
          castShadow
          receiveShadow
          geometry={nodes.Table.geometry}
          material={materials.mt_assets_mate}
          rotation={[0, -0.472, 0]}
          scale={[1, 1, 1.901]}
        />
        <mesh
          name="Sm_BK_Wire_04"
          castShadow
          receiveShadow
          geometry={nodes.Sm_BK_Wire_04.geometry}
          material={materials["Material.002"]}
          rotation={[Math.PI / 2, 0, -0.442]}
          scale={2.254}
        />
        <mesh
          name="Sm_BK_Wire_03"
          castShadow
          receiveShadow
          geometry={nodes.Sm_BK_Wire_03.geometry}
          material={materials["Material.002"]}
          rotation={[Math.PI / 2, 0, -0.442]}
          scale={2.254}
        />
        <mesh
          name="Sm_BK_Wire_02"
          castShadow
          receiveShadow
          geometry={nodes.Sm_BK_Wire_02.geometry}
          material={materials["Material.002"]}
          rotation={[Math.PI / 2, 0, -0.442]}
          scale={2.254}
        />
        <mesh
          name="Sm_BK_Wire_01"
          castShadow
          receiveShadow
          geometry={nodes.Sm_BK_Wire_01.geometry}
          material={materials["Material.002"]}
          rotation={[Math.PI / 2, 0, -0.442]}
          scale={2.254}
        />

        <group
          onPointerOver={(e) => setIsHover(true)}
          onPointerOut={(e) => setIsHover(false)}
        >
          <mesh
            name="SM_screen"
            castShadow
            receiveShadow
            geometry={nodes.SM_screen.geometry}
            material={materials.Screen}
            rotation={[-Math.PI, 0.639, -Math.PI]}
            scale={[-0.232, -0.017, -0.232]}
          />
          <mesh
            name="PC"
            castShadow
            receiveShadow
            geometry={nodes.PC.geometry}
            material={materials.mt_assets}
            rotation={[-Math.PI, 0.639, -Math.PI]}
            scale={[-0.232, -0.017, -0.232]}
          />
        </group>
        <mesh
          name="FRONT"
          castShadow
          receiveShadow
          geometry={nodes.FRONT.geometry}
          material={materials.mt_assets}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[2.151, 2.241, 1.21]}
        />
        <mesh
          name="Cone"
          castShadow
          receiveShadow
          geometry={nodes.Cone.geometry}
          material={materials.mtl_portal}
          rotation={[-1.736, 0.016, -0.169]}
          scale={[0.706, 3.672, 1.325]}
        />
        <mesh
          name="Box"
          castShadow
          receiveShadow
          geometry={nodes.Box.geometry}
          material={materials.mt_assets}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[1, 0.8, 1]}
        />
        <mesh
          name="Assets002"
          castShadow
          receiveShadow
          geometry={nodes.Assets002.geometry}
          material={materials.mt_assets}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[1, 0.8, 1]}
        />
        <mesh
          name="Assets001"
          castShadow
          receiveShadow
          geometry={nodes.Assets001.geometry}
          material={materials.mt_assets}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[1, 0.8, 1]}
        />
        <mesh
          name="Assets"
          castShadow
          receiveShadow
          geometry={nodes.Assets.geometry}
          material={materials.mt_assets}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[1, 0.8, 1]}
        />
        <mesh
          name="ARQ"
          castShadow
          receiveShadow
          geometry={nodes.ARQ.geometry}
          material={materials.mt_background}
          scale={[1, 0.8, 1]}
        />
        <mesh
          name="11_Nintendo"
          castShadow
          receiveShadow
          geometry={nodes["11_Nintendo"].geometry}
          material={materials["11_Nintendo"]}
          rotation={[Math.PI, -0.82, Math.PI]}
          scale={0.004}
        />
        <group
          name="Armature-Assets"
          position={[2.374, 1.316, -0.442]}
          rotation={[Math.PI / 2, 0, Math.PI / 2]}
        >
          <skinnedMesh
            name="Cat002"
            geometry={nodes.Cat002.geometry}
            material={materials["mt_cat.002"]}
            skeleton={nodes.Cat002.skeleton}
          />
          <primitive object={nodes.Cat} />
        </group>
        <mesh
          name="Fridge_Door"
          castShadow
          receiveShadow
          geometry={nodes.Fridge_Door.geometry}
          material={materials["mt_background.001"]}
          position={[-3.28, 1.493, -1.958]}
          scale={[1, 0.8, 1]}
          onPointerOver={(e) => setIsHover(true)}
          onPointerOut={(e) => setIsHover(false)}
        />
        <mesh
          name="Door"
          castShadow
          receiveShadow
          geometry={nodes.Door.geometry}
          material={materials["mt_background.001"]}
          position={[1.91, 1.541, -3.04]}
          scale={[1, 0.8, 1]}
        />
      </group>
    </group>
  );
};

useGLTF.preload("/models/office.glb");
