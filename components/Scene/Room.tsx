import { useCameraStore } from '@/store/camera-store';
import { useSceneCursor } from '@/store/scene-cursor';
import { Html, useAnimations, useGLTF, useTexture } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Room = () => {
  const group = useRef<any>();
  const texture = useTexture('/assets/windows/window_screenshot.png');
  const { nodes, materials, animations }: any = useGLTF('/models/room.glb');
  const { actions } = useAnimations(animations, group);
  const { setIsHoverOn, setIsHoverOff, setMedia } = useSceneCursor();
  const { epsilon } = useCameraStore();
  const basicMaterial = new THREE.MeshBasicMaterial();
  basicMaterial.map = materials.mt_background.map;
  basicMaterial.color = new THREE.Color(
    materials.mt_background.color
  ).multiplyScalar(0.8);

  useEffect(() => {
    actions['Cat-Clock-Loop']?.play();
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
          position={[-4.124, 0, -2.165]}
          rotation={[Math.PI / 2, 0, 1.054]}
          scale={[1, 0.8, 1]}
        />
        <mesh
          name="Table"
          castShadow
          receiveShadow
          geometry={nodes.Table.geometry}
          material={materials.mt_assets_mate}
          position={[-4.124, 0, -2.165]}
          rotation={[0, -1.525, 0]}
          scale={[1, 1, 1.901]}
        />
        <mesh
          name="Sm_BK_Wire_04"
          castShadow
          receiveShadow
          geometry={nodes.Sm_BK_Wire_04.geometry}
          material={materials['Material.002']}
          rotation={[Math.PI / 2, 0, -0.442]}
          scale={2.254}
        />
        <mesh
          name="Sm_BK_Wire_03"
          castShadow
          receiveShadow
          geometry={nodes.Sm_BK_Wire_03.geometry}
          material={materials['Material.002']}
          rotation={[Math.PI / 2, 0, -0.442]}
          scale={2.254}
        />
        <mesh
          name="Sm_BK_Wire_02"
          castShadow
          receiveShadow
          geometry={nodes.Sm_BK_Wire_02.geometry}
          material={materials['Material.002']}
          rotation={[Math.PI / 2, 0, -0.442]}
          scale={2.254}
        />
        <mesh
          name="Sm_BK_Wire_01"
          castShadow
          receiveShadow
          geometry={nodes.Sm_BK_Wire_01.geometry}
          material={materials['Material.002']}
          rotation={[Math.PI / 2, 0, -0.442]}
          scale={2.254}
        />
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
          material={basicMaterial}
          scale={[1, 0.8, 1]}
        />
        <group
          name="Armature-Assets"
          position={[2.374, 1.316, -0.442]}
          rotation={[Math.PI / 2, 0, Math.PI / 2]}
        >
          <skinnedMesh
            name="Cat002"
            geometry={nodes.Cat002.geometry}
            material={materials['mt_cat.002']}
            skeleton={nodes.Cat002.skeleton}
          />
          <primitive object={nodes.Cat} />
        </group>
        <mesh
          name="Fridge_Door"
          castShadow
          receiveShadow
          geometry={nodes.Fridge_Door.geometry}
          material={materials['mt_background.001']}
          position={[-3.28, 1.493, -1.958]}
          scale={[1, 0.8, 1]}
          onPointerOver={() => setIsHoverOn('Doom')}
          onPointerLeave={() => setIsHoverOff()}
          onClick={() => {
            setMedia(
              "Playing Doom! My therapy session – because sometimes all you need is a shotgun and some demon-splattering. Let's go to the computer and unleash the chaos on the screen!",
              '/audio/doom.mp3'
            );
          }}
        />
        <mesh
          name="Door"
          castShadow
          receiveShadow
          geometry={nodes.Door.geometry}
          material={materials['mt_background.001']}
          position={[1.91, 1.541, -3.04]}
          scale={[1, 0.8, 1]}
          onPointerOver={() => setIsHoverOn('go to the park')}
          onPointerLeave={() => setIsHoverOff()}
          onClick={() => {
            setMedia(
              'Visiting the park is like hitting the refresh button for your mood, with nature providing the best Wi-Fi connection for the soul.',
              '/audio/park.mp3'
            );
          }}
        />

        <group
          name="Sketchfab_model"
          position={[-1.698, 0.824, -5]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.007}
          onPointerOver={() =>
            setIsHoverOn('turn on computer (portfolio and more)')
          }
          onPointerLeave={() => setIsHoverOff()}
          onClick={() => {
            setMedia(
              'Computers are like air conditioning, they work fine until you start opening windows.',
              '/audio/computer.mp3'
            );
          }}
        >
          <group
            name="a5bfc7a51ed541f3a5b8b2dd1184f23cfbx"
            rotation={[Math.PI / 2, 0, 0]}
          >
            <group name="RootNode">
              <group
                name="retro_computer_setup"
                rotation={[-Math.PI / 2, 0, 0]}
              >
                <mesh
                  name="retro_computer_setup_retro_computer_setup_Mat_0"
                  castShadow
                  receiveShadow
                  geometry={
                    nodes.retro_computer_setup_retro_computer_setup_Mat_0
                      .geometry
                  }
                  material={materials.retro_computer_setup_Mat}
                  position={[32.742, 2008.411, 0.001]}
                  rotation={[0, 0, -0.184]}
                />
              </group>
            </group>
          </group>
        </group>

        <mesh
          name="screen"
          castShadow
          receiveShadow
          geometry={nodes.screen.geometry}
          position={[-1.62, 1.0262, -5.06]}
          rotation={[-0.08, 0, 0]}
          scale={[0.141, 0.132, 0.123]}
        >
          <planeGeometry attach="geometry" args={[2, 2]} />
          <meshBasicMaterial map={texture} />

          <Html
            rotation-x={0}
            transform
            scale={[0.051, 0.054, 0.06]}
            occlude
            position={[0, 0, epsilon ? 0.01 : -0.01]}
          >
            <iframe
              src="http://localhost:3001/"
              style={{
                width: '1580px',
                height: '1380px',
              }}
            ></iframe>
          </Html>
        </mesh>
      </group>
    </group>
  );
};

useGLTF.preload('/models/room.glb');
