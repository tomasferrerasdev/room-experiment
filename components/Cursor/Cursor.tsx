import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import React from "react";
import styles from "./Cursor.module.scss";
import { useSceneCursor } from "@/store/scene-cursor";

export const Cursor = () => {
  const { isHover, hoverMessage } = useSceneCursor();
  useGSAP(() => {
    gsap.set(".cursor", { xPercent: -50, yPercent: -50 });
    let xSetter = gsap.quickSetter(".cursor", "x", "px");
    let ySetter = gsap.quickSetter(".cursor", "y", "px");

    window.addEventListener("mousemove", (e) => {
      xSetter(e.x);
      ySetter(e.y);
    });
  });

  return (
    <div className={`${styles.cursor} cursor`}>
      {isHover ? (
        <>
          <img
            src="/assets/eye.gif"
            width={46}
            height={46}
            alt="eye gif cursor"
          />
          {hoverMessage && (
            <div className={styles.cursorMessage}>
              <span>{hoverMessage}</span>
            </div>
          )}
        </>
      ) : (
        <img
          src="/assets/cursor.png"
          width={40}
          height={40}
          alt="pointer cursor"
        />
      )}
    </div>
  );
};
