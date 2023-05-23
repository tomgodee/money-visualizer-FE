import React from "react";
import { FontLoader, TextGeometry } from "three-stdlib";
import helvetiker from "three/examples/fonts/helvetiker_regular.typeface.json";

import { extend, Object3DNode } from "@react-three/fiber";
import { Vector3 } from "three";
extend({ TextGeometry });

declare module "@react-three/fiber" {
  interface ThreeElements {
    textGeometry: Object3DNode<TextGeometry, typeof TextGeometry>;
  }
}

interface ValueTextProps {
  position: Vector3;
  text: string;
  textSize: number;
}

export function ValueText(props: ValueTextProps) {
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
