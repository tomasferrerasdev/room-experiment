import { useCursorStore } from '@/store/cursor-store';
import { Plane, useGLTF, useTexture } from '@react-three/drei';

export const Hoverables = () => {
  const { nodes, materials }: any = useGLTF('/models/room_2.glb');

  const texture = useTexture('/assets/doom.jpg');
  const { setHoverItem, playAudio, isPlaying } = useCursorStore();
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
    </>
  );
};
