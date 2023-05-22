import { Dispatch, SetStateAction } from "react";

import {
  Box,
  Checkbox,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
} from "@/components/chakra";
import { MAX_MAN_SCALE, MIN_MAN_SCALE, SCALE_ADJUSTER } from "@/constants";

interface ControlBoxProps {
  shouldShowMan: boolean;
  setShouldShowMan: Dispatch<SetStateAction<boolean>>;
  manScale: number;
  setManScale: Dispatch<SetStateAction<number>>;
  shouldShowText: boolean;
  setShouldShowText: Dispatch<SetStateAction<boolean>>;
}

export const ControlBox = (props: ControlBoxProps) => {
  const {
    shouldShowMan,
    setShouldShowMan,
    manScale,
    setManScale,
    shouldShowText,
    setShouldShowText,
  } = props;

  return (
    <Box>
      <Box>
        <Checkbox
          isChecked={shouldShowText}
          onChange={() => setShouldShowText((prevState) => !prevState)}
        >
          Show text
        </Checkbox>
      </Box>

      <Box>
        <Checkbox
          isChecked={shouldShowMan}
          onChange={() => setShouldShowMan((prevState) => !prevState)}
        >
          Render man
        </Checkbox>
      </Box>

      {shouldShowMan && (
        <Box mt={6} ml={2}>
          <Slider
            aria-label="Man scale"
            defaultValue={manScale}
            orientation="vertical"
            minH="32"
            size="lg"
            min={MIN_MAN_SCALE}
            max={MAX_MAN_SCALE}
            value={manScale}
            onChange={(value) => {
              setManScale(value / SCALE_ADJUSTER);
            }}
          >
            <SliderMark value={MAX_MAN_SCALE} top={-1} ml={5}>
              210cm
            </SliderMark>
            <SliderMark
              value={(MAX_MAN_SCALE + MIN_MAN_SCALE) / 2}
              top="40%"
              ml={5}
            >
              180cm
            </SliderMark>
            <SliderMark value={MIN_MAN_SCALE} bottom={0} ml={5}>
              150cm
            </SliderMark>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </Box>
      )}
    </Box>
  );
};
