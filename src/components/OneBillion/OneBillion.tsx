import React, { Dispatch, SetStateAction } from "react";

import FiftyMillion from "@/components/FiftyMillion";
import { Vector3 } from "@react-three/fiber";

interface OneBillionProps {
  stack: number;
  setTarget: Dispatch<SetStateAction<number[]>>;
}

export function OneBillion(props: OneBillionProps) {
  const { stack, setTarget } = props;

  const getFiftyMillionPositionX = (stack: number) => {
    return stack * 14 + 125;
  };

  const getFiftyMillionPositionY = (stack: number) => {
    return stack * 8.7;
  };

  const getFiftyMillionPositionZ = (stack: number) => {
    return stack * 10 - 153;
  };

  const content = [];
  for (let i = 0; i < 20; i++) {
    const y = Math.floor(stack / 5);
    const x = Math.floor(i % 10);
    const z = (stack % 5) * 2 + Math.floor(i / 10);

    content.push(
      <FiftyMillion
        key={i}
        scale={10}
        position={[
          getFiftyMillionPositionX(x),
          getFiftyMillionPositionY(y),
          getFiftyMillionPositionZ(z),
        ]}
        setTarget={setTarget}
      />
    );
  }

  return <>{content}</>;
}
