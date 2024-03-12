import { useSceneStore } from "@/store/scene-store";
import styles from "./InteractionMenu.module.scss";
import { useEffect } from "react";
import { Howl } from "howler";

export const InteractionMenu = () => {
  const { scene, setScene } = useSceneStore();

  useEffect(() => {
    if (!scene.quote) return;
    const sound = new Howl({
      src: [scene.soundSrc],
      volume: 0.2,
      onend: () => {
        setScene({ quote: "" });
      },
    });
    sound.play();
  }, [scene.quote]);

  return (
    <>
      <p className={styles.subtitle}>{scene?.quote && scene.quote}</p>
      {scene?.interactMenu && (
        <div className={styles.optionMenu}>
          <div>
            {scene.interactMenu.previousTrack && (
              <>
                <span>U</span>
                <p>Previous track</p>
              </>
            )}
          </div>
          <div>
            {scene.interactMenu.exit && (
              <>
                <span>E</span>
                <p>Exit</p>
              </>
            )}
          </div>
          <div>
            {scene.interactMenu.nextTrack && (
              <>
                <span>I</span>
                <p>Next track</p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};
