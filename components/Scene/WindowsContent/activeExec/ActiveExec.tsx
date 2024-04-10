import styles from './ActiveExec.module.scss';
import { About } from './Routes/About/About';

export const ActiveExec = () => {
  return (
    <div className={styles.activeExecContainer}>
      <div className={styles.activeExec}>
        <div className={styles.activeExecBorder}>
          <div className={styles.activeExecTopBar}>
            <p>Tomas Ferreras - Portfolio 2024</p>
            <div className={styles.activeExecActions}>
              <ul>
                <li>
                  <img src="/assets/windows/minimize.png" alt="" />
                </li>
                <li>
                  <img src="/assets/windows/window.png" alt="" />
                </li>
                <li>
                  <img src="/assets/windows/close.png" alt="" />
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* <Home /> */}
        <About />
      </div>
    </div>
  );
};

{
  /* <li>
<div>
  <img src="/assets/windows/minimize.png" alt="" />
</div>
</li>
<li>
<div>
  <img src="/assets/windows/window.png" alt="" />
</div>
</li>
<li>
<div>
  <img src="/assets/windows/close.png" alt="" />
</div>
</li> */
}
