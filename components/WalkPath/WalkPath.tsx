import { Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useMemo } from "react";
import * as THREE from "three";

export const WalkPath = () => {
  useFrame(() => {
    const curPointIndex = Math.min(
      Math.round(1 * linePoints.length),
      linePoints.length - 1
    );

    const curPoint = linePoints[curPointIndex];
  });

  const handleMove = (event: KeyboardEvent) => {
    if (event.key === "ArrowLeft") {
      console.log("Left");
    } else if (event.key === "ArrowRight") {
      console.log("Right");
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleMove);
    return () => {
      document.removeEventListener("keydown", handleMove);
    };
  }, []);

  const LINE_NB_POINTS = 120;
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(-3, 0.2, -2.2),
        new THREE.Vector3(-2, 0.2, -2.2),
        new THREE.Vector3(0, 0.2, -1.5),
        new THREE.Vector3(1, 0.2, -1.5),
        new THREE.Vector3(1.5, 0.2, -2),
        new THREE.Vector3(1.6, 0.2, -2.8),
      ],
      false,
      "catmullrom"
    );
  }, []);

  const linePoints = useMemo(() => {
    return curve.getPoints(LINE_NB_POINTS);
  }, [curve]);

  return (
    <Line points={linePoints} color={"white"} linewidth={3} lineWidth={3} />
  );
};
