import { useCursorStore } from '@/store/cursor-store';
import styles from './Subtitles.module.scss';

export const Subtitles = () => {
  const { isPlaying, playingItem } = useCursorStore();
  return (
    <>
      <p className={styles.version}>
        This website is under construction 2024, come back soon to see new
        features
      </p>
      <div className={styles.subtitle}>
        {isPlaying && playingItem!.subtitleText}
      </div>
    </>
  );
};
