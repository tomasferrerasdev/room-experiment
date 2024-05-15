import { useCursorStore } from '@/store/cursor-store';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import Image from 'next/image';
import styles from './Cursor.module.scss';

export const Cursor = () => {
  const { hoverItem } = useCursorStore();
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
      {hoverItem ? (
        <>
          <Image
            src="/assets/eye.gif"
            width={46}
            height={46}
            alt="eye gif cursor"
          />
          <div className={styles.cursorMessage}>
            <span>{hoverItem.text}</span>
          </div>
        </>
      ) : (
        <Image src="/assets/cursor.png" width={46} height={46} alt="cursor" />
      )}
    </div>
  );
};
