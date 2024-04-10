import styles from './WindowsContent.module.scss';
import { ActiveExec } from './activeExec/ActiveExec';
import { Execs } from './execs/Execs';

export const WindowsContent = () => {
  return (
    <div className={styles.container}>
      <Execs />
      <ActiveExec />
      <div className={styles.bottomBar}>
        <div className={styles.bottomBarContainer}>
          <img src="/assets/windows_logo.png" alt="windows 95" />
          <p>Start</p>
        </div>
        <div className={styles.bottomBarTabContainer}>
          <div className={styles.bottomBarTab}>
            <div className={styles.bottomBarTabBackground}>
              <img src="/assets/windows_my_logo.png" alt="windows 95 my logo" />
              <p>My Portfolio</p>
            </div>
          </div>
        </div>
        <div className={styles.bottomBarSound}>
          <img src="/assets/windows_sound.png" alt="windows 95 sound" />
          <p>9:34 PM</p>
        </div>
      </div>
    </div>
  );
};
