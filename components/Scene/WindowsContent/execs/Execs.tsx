import styles from './Execs.module.scss';

export const Execs = () => {
  return (
    <div className={styles.execContainer}>
      <div className={styles.exec}>
        <img src="/assets/windows_my_logo.png" alt="" />
        <p>My Portfolio</p>
      </div>
      <div className={styles.exec}>
        <img src="/assets/windows_doom.png" alt="" />
        <p>UltimateDOOM</p>
      </div>
      <div className={styles.exec}>
        <img src="/assets/windows_cv.png" alt="" />
        <p>My Resume</p>
      </div>
    </div>
  );
};
