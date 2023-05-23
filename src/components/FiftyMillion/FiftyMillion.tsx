import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

import { useGLTF } from "@react-three/drei";
import { Vector3 } from "three";

interface FiftyMillionProps {
  scale: number;
  position: Vector3;
  setTarget: Dispatch<SetStateAction<Vector3>>;
}

export function FiftyMillion(props: FiftyMillionProps) {
  const model: any = useGLTF("/fifty_million/50m_model_neat.glb");
  const nodes = model.nodes;
  const materials = model.materials;
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
      scale={props.scale}
      position={props.position}
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
