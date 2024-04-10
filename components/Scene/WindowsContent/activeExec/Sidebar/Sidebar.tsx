import styles from './Sidebar.module.scss';

export const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <p>Tomas Ferreras</p>
        <span>Portfolio 2024</span>
      </div>
      <nav>
        <ul>
          <li>
            <div className={styles.marker}></div>
            <a href="">Home</a>
          </li>
          <li>
            <a href="">About</a>
          </li>
          <li>
            <a href="">Projects</a>
          </li>
          <li>
            <a href="">Contact</a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};
