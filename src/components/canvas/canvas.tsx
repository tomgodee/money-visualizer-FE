"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Box3 } from "three/src/math/Box3";
import { Vector3 } from "three";
import { Group } from "three/src/Three";

import Man from "@/components/Man";
import One from "@/components/One";
import OneBillion from "@/components/OneBillion";
import OneHundred from "@/components/OneHundred";
import OneMillion from "@/components/OneMillion";
import ValueText from "@/components/ValueText";
import TenGrand from "@/components/TenGrand";
import {
  ONE_BILLION,
  ONE_HUNDRED,
  ONE_MILLION,
  TEN_THOUSAND,
} from "@/constants";
import { Physics, usePlane } from "@react-three/cannon";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

interface PlaneProps {
  width: number;
  height: number;
}

function Plane(props: PlaneProps) {
  const { width, height } = props;
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }));

  return (
    <mesh receiveShadow ref={ref as any}>
      <planeGeometry args={[width, height]} />
      <meshStandardMaterial color="#FFFFFF" />
    </mesh>
  );
}

interface MainCanvasProps {
  money: number;
  shouldShowMan: boolean;
  manScale: number;
  shouldShowText: boolean;
}
export default function MainCanvas(props: MainCanvasProps) {
  const { money, shouldShowMan, manScale, shouldShowText } = props;
  const [isMillionMode, setIsMillionMode] = useState(false);
  const [manX, setManX] = useState(0);
  const [secondGroupX, setSecondGroupX] = useState(0);
  const [planeWidth, setPlaneWidth] = useState(200);
  const [planeHeight, setPlaneHeight] = useState(200);
  const [target, setTarget] = useState(new Vector3(0, 1, 0));

  const [firstGroupRef, setFirstGroupRef] = useState<Group>(new Group());

  const firstGroupRefCallBack = useCallback((node: any) => {
    if (node !== null) {
      setFirstGroupRef(node);
    }
  }, []);

  const stacks = useMemo(() => {
    const oneBillionStackCount = Math.floor(money / ONE_BILLION);

    const oneMillionStackCount = Math.floor(
      (money - oneBillionStackCount * ONE_BILLION) / ONE_MILLION
    );

    const tenThousandStackCount = Math.floor(
      (money -
        oneBillionStackCount * ONE_BILLION -
        oneMillionStackCount * ONE_MILLION) /
        TEN_THOUSAND
    );

    const oneHundredStackCount = Math.floor(
      (money -
        oneBillionStackCount * ONE_BILLION -
        oneMillionStackCount * ONE_MILLION -
        tenThousandStackCount * TEN_THOUSAND) /
        ONE_HUNDRED
    );

    const oneStackCount = Math.floor(
      money -
        oneBillionStackCount * ONE_BILLION -
        oneMillionStackCount * ONE_MILLION -
        tenThousandStackCount * TEN_THOUSAND -
        oneHundredStackCount * ONE_HUNDRED
    );

    const createStack = (count: number) => {
      return new Array(count).fill(0).map((_, index) => index);
    };

    return [
      createStack(oneBillionStackCount),
      createStack(oneMillionStackCount),
      createStack(tenThousandStackCount),
      createStack(oneHundredStackCount),
      createStack(oneStackCount),
    ];
  }, [money]);

  const resetPosition = () => {
    setPlaneWidth(200);
    setPlaneHeight(200);
    setManX(10);
  };

  useEffect(() => {
    setIsMillionMode(money >= ONE_MILLION);
    if (money < ONE_BILLION) {
      resetPosition();
    }
  }, [money]);

  useEffect(() => {
    if (firstGroupRef) {
      if (money >= ONE_BILLION) {
        const box = new Box3().setFromObject(firstGroupRef);
        let boxSize = new Vector3();
        const firstGroupSize = box.getSize(boxSize);

        // Make the man to stand next to on the right 15 pixels
        setManX(firstGroupSize.x / 2 + 15);
        setSecondGroupX(firstGroupSize.x / 2);
        setPlaneWidth(firstGroupSize.x * 1.4);
        setPlaneHeight(firstGroupSize.z * 2.75);
      }
    }
  }, [firstGroupRef]);

  return (
    <Canvas frameloop="demand" performance={{ max: 0.1 }}>
      <ambientLight intensity={0.7} />
      <directionalLight color="white" intensity={0.7} position={[0, 1, 0]} />
      <directionalLight color="white" intensity={0.7} position={[1, 0, 0]} />
      <directionalLight color="white" intensity={0.7} position={[-1, 1, 0]} />
      <color attach="background" args={["#FAE1DF"]} />

      <Physics>
        <Plane width={planeWidth} height={planeHeight} />
        {isMillionMode && (
          <>
            <group ref={firstGroupRefCallBack}>
              {shouldShowText && (
                <ValueText
                  position={
                    new Vector3(
                      -30,
                      (Math.floor(stacks[0].length / 6) + 1) * 11.2,
                      stacks[0].length < 5 ? stacks[0].length * 7 - 4 : 35
                    )
                  }
                  text={
                    stacks[0].length
                      ? `${(stacks[0].length * ONE_BILLION).toLocaleString()}`
                      : ""
                  }
                  textSize={3}
                />
              )}

              {stacks[0].map((stack) => {
                return (
                  <OneBillion key={stack} stack={stack} setTarget={setTarget} />
                );
              })}
            </group>

            <group position={[secondGroupX, 0, 0]}>
              {shouldShowText && (
                <ValueText
                  position={
                    new Vector3(
                      -5.5,
                      Math.floor(stacks[1].length / 20) * 0.65 + 3,
                      stacks[1].length < 21 ? stacks[1].length - 11 : 9
                    )
                  }
                  text={
                    stacks[1].length
                      ? `${(stacks[1].length * ONE_MILLION).toLocaleString()}`
                      : ""
                  }
                  textSize={1.5}
                />
              )}
              {stacks[1].map((stack) => {
                return (
                  <OneMillion key={stack} stack={stack} setTarget={setTarget} />
                );
              })}
            </group>
          </>
        )}

        {!isMillionMode && (
          <>
            <group>
              {shouldShowText && (
                <ValueText
                  position={new Vector3(-6, (stacks[2].length + 2) * 0.165, 0)}
                  text={
                    stacks[2].length ? `${stacks[2].length * TEN_THOUSAND}` : ""
                  }
                  textSize={0.5}
                />
              )}
              {stacks[2].map((stack) => {
                return (
                  <TenGrand
                    key={stack}
                    position={new Vector3(-5, (stack + 0.1) * 0.165, 0)}
                    scale={0.15}
                    setTarget={setTarget}
                  />
                );
              })}
            </group>

            <group>
              {shouldShowText && (
                <ValueText
                  position={
                    new Vector3(-3.1, (stacks[3].length + 60) * 0.005, 0)
                  }
                  text={
                    stacks[3].length ? `${stacks[3].length * ONE_HUNDRED}` : ""
                  }
                  textSize={0.5}
                />
              )}
              {stacks[3].map((stack) => {
                return (
                  <OneHundred
                    key={stack}
                    position={new Vector3(-2.5, (stack + 1) * 0.005, 0)}
                    scale={0.15}
                    setTarget={setTarget}
                  />
                );
              })}
            </group>

            <group>
              {shouldShowText && (
                <ValueText
                  position={
                    new Vector3(-0.35, (stacks[4].length + 60) * 0.005, 0)
                  }
                  text={stacks[4].length ? `${stacks[4].length}` : ""}
                  textSize={0.5}
                />
              )}
              {stacks[4].map((stack) => {
                return (
                  <One
                    key={stack}
                    position={new Vector3(0, (stack + 1) * 0.005, 0)}
                    scale={0.15}
                    setTarget={setTarget}
                  />
                );
              })}
            </group>
          </>
        )}

        {shouldShowMan && (
          <Man scale={manScale} position={new Vector3(manX, 0, 0)} />
        )}
      </Physics>

      <OrbitControls target={target as any} minDistance={2} enableDamping />
      <PerspectiveCamera makeDefault position={[0, 20, 40]} />
    </Canvas>
  );
}
