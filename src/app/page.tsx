"use client";
import { useState } from "react";

import Canvas from "@/components/canvas/canvas";
import { Box, Flex } from "@/components/chakra";
import ControlBox from "@/components/ControlBox";
import InputBox from "@/components/InputBox";
import { DEFAULT_MAN_SCALE, SCALE_ADJUSTER } from "@/constants";

export default function Home() {
  const [money, setMoney] = useState(0);
  const [shouldShowText, setShouldShowText] = useState(true);
  const [shouldShowMan, setShouldShowMan] = useState(false);
  const [manScale, setManScale] = useState(DEFAULT_MAN_SCALE);
  const [entryId, setEntryId] = useState(0);

  return (
    <main>
      <Flex>
        <Box id="canvas-container" height="100vh" width="75%">
          <Canvas
            money={money}
            shouldShowMan={shouldShowMan}
            manScale={manScale}
            shouldShowText={shouldShowText}
          />
        </Box>

        <Box width="25%" p={4}>
          <InputBox
            setMoney={setMoney}
            money={money}
            entryId={entryId}
            setEntryId={setEntryId}
          />

          <Box mt={12}>
            <ControlBox
              shouldShowMan={shouldShowMan}
              setShouldShowMan={setShouldShowMan}
              manScale={manScale * SCALE_ADJUSTER}
              setManScale={setManScale}
              shouldShowText={shouldShowText}
              setShouldShowText={setShouldShowText}
            />
          </Box>
        </Box>
      </Flex>
    </main>
  );
}
