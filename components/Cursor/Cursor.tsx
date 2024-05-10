import { useSceneCursor } from '@/store/scene-cursor';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import Image from 'next/image';
import styles from './Cursor.module.scss';

export const Cursor = () => {
  const { isHover, hoverMessage } = useSceneCursor();
  useGSAP(() => {
    gsap.set('.cursor', { xPercent: -50, yPercent: -50 });
    let xSetter = gsap.quickSetter('.cursor', 'x', 'px');
    let ySetter = gsap.quickSetter('.cursor', 'y', 'px');

    window.addEventListener('mousemove', (e) => {
      xSetter(e.x);
      ySetter(e.y);
    });
  });

  return (
    <div className={`${styles.cursor} cursor`}>
      {isHover ? (
        <>
          <Image
            src="/assets/eye.gif"
            width={46}
            height={46}
            alt="eye gif cursor"
            priority
          />
          {hoverMessage && (
            <div className={styles.cursorMessage}>
              <span>{hoverMessage}</span>
            </div>
          )}
        </>
      ) : (
        <Image
          src="/assets/cursor.png"
          width={40}
          height={40}
          alt="pointer cursor"
          priority
        />
      )}
    </div>
  );
};
