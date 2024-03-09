import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import React from "react";
import styles from "./Cursor.module.scss";
import { Howl, Howler } from "howler";

export const Cursor = ({ isHover }: any) => {
  useGSAP(() => {
    gsap.set(".cursor", { xPercent: -50, yPercent: -50 });
    let targets = gsap.utils.toArray(".target");
    let xSetter = gsap.quickSetter(".cursor", "x", "px");
    let ySetter = gsap.quickSetter(".cursor", "y", "px");
    console.log(targets);

    window.addEventListener("mousemove", (e) => {
      xSetter(e.x);
      ySetter(e.y);
    });
  });

  const playAudio = () => {
    const sound = new Howl({
      src: ["/audio/voiceMock.mp3"],
    });

    sound.play();
  };

  return (
    <div className={`${styles.cursor} cursor`}>
      {isHover ? (
        <img
          src="/assets/eye.gif"
          width={46}
          height={46}
          alt="eye gif cursor"
        />
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
