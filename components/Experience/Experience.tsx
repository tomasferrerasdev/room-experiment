import { Physics } from '@react-three/rapier';
import { Character } from '../Character/Character';
import { Scene } from '../Scene/Scene';

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
