import { Physics } from '@react-three/rapier';
import { Character } from '../Character/Character';
import { Room } from '../Scene/Room';

export const Experience = () => {
  return (
    <>
      <Physics>
        <Room />
        <Character />
      </Physics>
    </>
  );
};
