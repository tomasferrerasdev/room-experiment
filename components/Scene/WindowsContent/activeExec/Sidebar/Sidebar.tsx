import styles from './Sidebar.module.scss';

export const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <p>Tomas Ferreras</p>
        <span>Portfolio 2024</span>
      </div>
    </aside>
  );
};
