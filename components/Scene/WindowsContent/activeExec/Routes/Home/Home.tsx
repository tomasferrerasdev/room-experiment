import styles from './Home.module.scss';

export const Home = () => {
  return (
    <div className={styles.activeExecContent}>
      <h1>Tomas Ferreras</h1>
      <p>Software Developer</p>
      <div className={styles.activeExecLinks}>
        <ul>
          <li>
            <a href="">ABOUT</a>
          </li>
          <li>
            <a href="">EXPERIENCE</a>
          </li>
          <li>
            <a href="">PROJECTS</a>
          </li>
          <li>
            <a href="">CONTACT</a>
          </li>
        </ul>
      </div>
    </div>
  );
};
