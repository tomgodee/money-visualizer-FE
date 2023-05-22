import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

import { useGLTF } from "@react-three/drei";
import { GroupProps } from "@react-three/fiber";

interface FiftyMillionProps {
  scale: number;
  position: number[];
  setTarget: Dispatch<SetStateAction<number[]>>;
}

export function FiftyMillion(props: FiftyMillionProps) {
  const { nodes, materials } = useGLTF("/fifty_million/50m_model_neat.glb");
  const { setTarget } = props;
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";

    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hovered]);

  return (
    <group
      {...props}
      dispose={null}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Material1.geometry}
        material={materials["0000000PalletteLow"]}
        onDoubleClick={(e) => {
          setTarget(e.intersections[0].point.clone());
        }}
      />
    </group>
  );
}

useGLTF.preload("/fifty_million/50m_model_neat.glb");
