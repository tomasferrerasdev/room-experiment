import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { Howl } from "howler";
import { useSceneCursor } from "@/store/scene-cursor";
import { useSceneActions } from "@/store/scene-actions";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useMenu } from "@/store/interact-menu";
import { useSceneStore } from "@/store/scene-store";

export const Scene = () => {
  const group = useRef<any>();
  const { nodes, materials, animations }: any = useGLTF("/models/scene.glb");
  const { actions } = useAnimations(animations, group);
  const { setIsHoverOn, setIsHoverOff } = useSceneCursor();
  const { setScene } = useSceneStore();

  useEffect(() => {
    actions["Cat-Clock-Loop"]?.play();
  }, []);

  return (
    <group ref={group} dispose={null}>
      <group name="Scene">
        <group
          name="Sketchfab_model"
          position={[0, 0.53, -3.819]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.003}
          onPointerOver={() => setIsHoverOn("radio music player")}
          onPointerOut={setIsHoverOff}
          onClick={(e) => {
            setScene({
              cameraConfig: {
                lookAt: [-5, 0, 0],
                position: [-1.8, 1.0, -0.3],
              },
              soundSrc: "/audio/musicPlayer.mp3",
              quote:
                "Ready to dive into my life's playlist? Pick a track, and add some beats to this!",
              interactMenu: {
                previousTrack: false,
                exit: true,
                nextTrack: false,
              },
            });
          }}
        >
          <group
            name="45f7aca418ac4ddd89c4a8cf16230b02fbx"
            rotation={[Math.PI / 2, 0, 0]}
          >
            <group name="RootNode">
              <group
                name="Radio_lowPoly_Versia_2"
                position={[0, 18.707, 0]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={100}
              >
                <mesh
                  name="Radio_lowPoly_Versia_2_Material020_0"
                  castShadow
                  receiveShadow
                  geometry={nodes.Radio_lowPoly_Versia_2_Material020_0.geometry}
                  material={materials["Material.020"]}
                  position={[-8.136, -10.039, 0.545]}
                  rotation={[0, 0, 1.252]}
                  scale={1.419}
                />
              </group>
            </group>
          </group>
        </group>
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
          onPointerOver={() => setIsHoverOn("wires")}
          onPointerOut={setIsHoverOff}
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
          name="computer"
          onPointerOver={() => setIsHoverOn("computer")}
          onPointerOut={setIsHoverOff}
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
        <mesh
          name="doom"
          castShadow
          receiveShadow
          geometry={nodes.Plane.geometry}
          material={materials["Material.001"]}
          position={[2.312, 1.249, -2.971]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.24, 0.356, 0.356]}
          onPointerOver={() => setIsHoverOn("DOOM")}
          onPointerOut={setIsHoverOff}
        />
        <mesh
          name="ultraman"
          castShadow
          receiveShadow
          geometry={nodes.Plane001.geometry}
          material={materials["Material.003"]}
          position={[-3.69, 1.091, -1.216]}
          rotation={[Math.PI / 2, 0, -1.567]}
          scale={[0.24, 0.356, 0.356]}
          onPointerOver={() => setIsHoverOn("Ultraman")}
          onPointerOut={setIsHoverOff}
        />
      </group>
    </group>
  );
};

useGLTF.preload("/models/scene.glb");
