import React, { Dispatch, SetStateAction } from "react";
import { Vector3, Euler } from "three";

import OneHundredThousand from "../OneHundredThousand";

interface OneMillionProps {
  stack: number;
  setTarget: Dispatch<SetStateAction<Vector3>>;
}

export function OneMillion(props: OneMillionProps) {
  const { stack, setTarget } = props;

  const getOneMillionPositionX = (stack: number) => {
    return stack * 1.35 - 5;
  };

  const getOneMillionPositionY = (stack: number) => {
    return stack * 0.65 - 4.5;
  };

  const getOneMillionPositionZ = (stack: number) => {
    return stack * 1.8 + 15;
  };

  const content = [];
  for (let i = 0; i < 10; i++) {
    const y = Math.floor(stack / 20);
    const x = i % 10;
    const z = stack % 20;
    content.push(
      <OneHundredThousand
        key={i}
        scale={10}
        position={
          new Vector3(
            getOneMillionPositionX(x),
            getOneMillionPositionY(y),
            getOneMillionPositionZ(z)
          )
        }
        setTarget={setTarget}
      />
    );
  }

  return <group>{content}</group>;
}
