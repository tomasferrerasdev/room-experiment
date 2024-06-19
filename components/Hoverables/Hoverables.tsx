import { useCursorStore } from '@/store/cursor-store';
import { useCameraAnimation } from '@/utils/animateCamera';
import { Plane, useGLTF, useTexture } from '@react-three/drei';
import { useLoader, useThree } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export const Hoverables = () => {
  const { nodes, materials }: any = useGLTF('/models/room_2.glb');
  const { startAnimation } = useCameraAnimation();
  const texture = useTexture('/assets/doom.jpg');
  const { setHoverItem, playAudio, isPlaying, setRemoveCursor } =
    useCursorStore();

  return (
    <>
      <Plane
        args={[0.5, 0.7]}
        position={[0.9, 1.3, -2.97]}
        rotation={[0, 0, 0]}
        onPointerEnter={() => setHoverItem(1)}
        onPointerLeave={() => setHoverItem(null)}
        onClick={() => {
          if (!isPlaying) {
            playAudio();
          }
        }}
      >
        <meshStandardMaterial attach="material" map={texture} />
      </Plane>
      <group position={[-3, 0.824, -4]}>
        {/* {start && <Sound url="/audio/computer-ambience.ogg" />} */}
      </group>
      <group
        name="Sketchfab_model001"
        position={[-1.806, 0.824, -3.695]}
        rotation={[-Math.PI / 2, 0, 1.35]}
        scale={0.007}
        onPointerEnter={() => setHoverItem(2)}
        onPointerLeave={() => setHoverItem(null)}
        onClick={() => {
          if (!isPlaying) {
            playAudio();
          }
        }}
      >
        <group
          name="a5bfc7a51ed541f3a5b8b2dd1184f23cfbx"
          rotation={[Math.PI / 2, 0, 0]}
        >
          <group name="RootNode">
            <group name="retro_computer_setup" rotation={[-Math.PI / 2, 0, 0]}>
              <mesh
                name="retro_computer_setup_retro_computer_setup_Mat_0"
                castShadow
                receiveShadow
                geometry={
                  nodes.retro_computer_setup_retro_computer_setup_Mat_0.geometry
                }
                material={materials['retro_computer_setup_Mat.001']}
                position={[32.742, 2008.411, 0.001]}
                rotation={[0, 0, -0.184]}
              />
            </group>
          </group>
        </group>
      </group>
      <mesh
        onPointerEnter={() => setHoverItem(3)}
        onPointerLeave={() => setHoverItem(null)}
        onClick={() => {
          if (!isPlaying) {
            playAudio();
          }
        }}
        name="Door"
        castShadow
        receiveShadow
        geometry={nodes.Door.geometry}
        material={materials['mt_background.003']}
        position={[1.91, 1.541, -3.04]}
        scale={[1, 0.8, 1]}
      />

      <mesh
        onPointerEnter={() => setHoverItem(4)}
        onPointerLeave={() => setHoverItem(null)}
        onClick={() => {
          if (!isPlaying) {
            playAudio();
          }
        }}
        name="Fridge_Door"
        castShadow
        receiveShadow
        geometry={nodes.Fridge_Door.geometry}
        material={materials['mt_background.003']}
        position={[-3.28, 1.493, -1.958]}
        scale={[1, 0.8, 1]}
      />
      <group
        onPointerEnter={() => {
          setHoverItem(5);
          document.body.style.cursor = 'pointer';
        }}
        onPointerLeave={() => {
          setHoverItem(null);
          document.body.style.cursor = 'none';
        }}
        onClick={() => {
          startAnimation({
            position: new THREE.Vector3(-0.1, 1.3, 3),
            rotation: new THREE.Quaternion().setFromEuler(
              new THREE.Euler(0, 0, 0, 'XYZ')
            ),
          });
          setRemoveCursor(false);
          document.body.style.cursor = 'none';
        }}
      >
        <mesh position={[-1.807, 0.895, -3.9]} rotation={[-0.3, 1.35, 0]}>
          <circleGeometry args={[0.005, 16]} />
          <meshBasicMaterial color={'#7a6737'} />
        </mesh>
        <mesh position={[-1.8071, 0.895, -3.9]} rotation={[-0.3, 1.35, 0]}>
          <circleGeometry args={[0.006, 16]} />
          <meshBasicMaterial color={'#564926'} />
        </mesh>
      </group>
    </>
  );
};

function Sound({ url }: { url: string }) {
  const sound = useRef<any>();
  const { camera } = useThree();
  const [listener] = useState(() => new THREE.AudioListener());
  const buffer = useLoader(THREE.AudioLoader, url);
  useEffect(() => {
    if (sound) {
      sound.current.setBuffer(buffer);
      sound.current.setRefDistance(1);
      sound.current.setLoop(true);
      sound.current.setVolume(0.5);
      sound.current.play();
    }
    camera.add(listener);
    return () => {
      camera.remove(listener);
    };
  }, [buffer, camera, listener]);

  return <positionalAudio ref={sound} args={[listener]} />;
}
