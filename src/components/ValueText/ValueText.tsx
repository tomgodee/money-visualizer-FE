import React from "react";
import { FontLoader, TextGeometry } from "three-stdlib";
import helvetiker from "three/examples/fonts/helvetiker_regular.typeface.json";

import { extend } from "@react-three/fiber";

interface ValueTextProps {
  position: number[];
  text: string;
  textSize: number;
}

export function ValueText(props: ValueTextProps) {
  extend({ TextGeometry });
  const helvetikerRegular = new FontLoader().parse(helvetiker as any);
  const { position, text, textSize } = props;

  const textOptions = {
    font: helvetikerRegular,
    size: textSize || 0.5,
    height: 0.2,
  };

  return (
    <mesh position={position} rotation={[0, 0, 0]}>
      <textGeometry attach="geometry" args={[text, { ...textOptions }]} />
      <meshLambertMaterial attach="material" color="#85BB65" />
    </mesh>
  );
}
