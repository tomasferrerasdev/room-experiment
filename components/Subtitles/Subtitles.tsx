import { useCursorStore } from '@/store/cursor-store';
import styles from './Subtitles.module.scss';

export const Subtitles = () => {
  const { isPlaying, playingItem } = useCursorStore();
  return (
    <>
      <p className={styles.version}>
        This website is under construction, models and room could change. stay
        tuned!
      </p>
      <div className={styles.subtitle}>
        {isPlaying && playingItem!.subtitleText}
      </div>
    </>
  );
};
