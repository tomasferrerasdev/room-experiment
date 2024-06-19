import { useCursorStore } from '@/store/cursor-store';
import styles from './Subtitles.module.scss';

export const Subtitles = () => {
  const { isPlaying, playingItem } = useCursorStore();
  return (
    <>
      <p className={styles.available}>
        <span></span>Available to work
      </p>

      <div className={styles.subtitle}>
        {isPlaying && playingItem!.subtitleText}
      </div>
    </>
  );
};
