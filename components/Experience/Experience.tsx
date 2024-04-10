import { Physics } from '@react-three/rapier';
import { Character } from '../Character/Character';
import { Office } from '../Scene/Office';

export const Experience = () => {
  return (
    <>
      <Physics>
        <Office />
        <Character />
      </Physics>
    </>
  );
};
