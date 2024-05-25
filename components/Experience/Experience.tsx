import { Character } from '../Character/Character';
import { Hoverables } from '../Hoverables/Hoverables';
import { Room } from '../Scene/Room';

export interface Props {
  start: boolean;
}

export const Experience = ({ start }: Props) => {
  return (
    <>
      <Character />
      <Room />
      <Hoverables start={start} />
    </>
  );
};
