import { useProgress } from '@react-three/drei';
import { useState } from 'react';
import styles from './LoadingScreen.module.scss';

const resources = [
  'Loading Tomas Ferreras model',
  'Loading Tomas Ferreras room',
  'Loading portfolio',
  'Drinking mate',
  'Loading decor',
  'Loading Doom videogame',
];

export const LoadingScreen = ({ started, onStarted }: any) => {
  const { progress } = useProgress();
  const [animationEnd, setAnimationEnd] = useState(false);

  return (
    <>
      <div
        className={`${styles.loadingScreen}  ${started ? styles.started : ''}`}
      >
        {animationEnd && progress === 100 ? (
          <>
            <button disabled={progress < 100} onClick={onStarted}>
              Start
            </button>
          </>
        ) : (
          <>
            <div className={`${styles.loadingScreenTitle} ${styles.spacer}`}>
              <p>
                Ferreras, <br />
                Tomas Inc.
              </p>
              <p>
                Released: 2001 <br />
                HHBIOS (C)2001 Ferreras Tomas Inc.,
              </p>
            </div>
            <p className={`${styles.spacer}`}>
              HSP S13 2001-2024 Special UC135
            </p>
            <div className={`${styles.spacer}`}>
              <p>HSP Portfolio(tm) XX 113</p>
              <p>Checking RAM : 14000 OK</p>
            </div>
            <p className={styles.loadingResources}>
              LOADING RESOURCES (19/19)<span className={styles.loading}></span>
            </p>
            <div className={`${styles.resources} ${styles.spacer}`}>
              {resources.map((resource, i) => (
                <div
                  className={styles.resource}
                  style={{ '--i': i } as React.CSSProperties}
                  key={i}
                  onAnimationEnd={() => {
                    if (i === 5) {
                      setAnimationEnd(true);
                    }
                  }}
                >
                  <p>
                    {resource} <span className={styles.loading}></span>
                  </p>
                  <p>
                    {progress !== 100 && <span className={styles.loading} />}
                    {Math.round(progress)}%
                  </p>
                </div>
              ))}
            </div>
            <p className={styles.waiting_code}>_</p>
            <div className={styles.loadingScreenBottom}>
              <p>
                Press <b>DEL</b> to enter SETUP , <b>ESC</b> to skip memory test
              </p>
              <p>5/14/2024</p>
            </div>
          </>
        )}
      </div>
    </>
  );
};
