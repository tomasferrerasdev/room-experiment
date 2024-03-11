import { Scene } from "../Scene/Scene";
import { Character } from "../Character/Character";
import { Physics, RigidBody } from "@react-three/rapier";

export const Experience = () => {
  return (
    <>
      <Physics>
        <Scene />
        <Character />
      </Physics>
    </>
  );
};
