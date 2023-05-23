import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";

import {
  Button,
  Flex,
  Input,
  RepeatIcon,
  Spinner,
  Text,
  Tooltip,
  QuestionOutlineIcon,
} from "@/components/chakra";
import { useEntries, useEntryById, useEntryCount } from "@/services/entries";

interface InputBoxProps {
  setMoney: Dispatch<SetStateAction<number>>;
  money: number;
  entryId: number;
  setEntryId: Dispatch<SetStateAction<number>>;
}

export const InputBox = (props: InputBoxProps) => {
  const { setMoney, money, entryId, setEntryId } = props;
  const [searchInput, setSearchInput] = useState("");
  const [entryInput, setEntryInput] = useState("");
  const [yearlyIncome, setYearlyIncome] = useState("");

  const { entries, isLoading } = useEntries(entryInput);
  const { entryCount } = useEntryCount();
  const { entry } = useEntryById(entryId);

  const handleOnChangeSearchInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    if (value.trim().length <= 127) {
      setSearchInput(value);
    }
  };

  const handleOnChangeYearlyIncome = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    const trimmedValue = value.replaceAll(",", "");
    if (/^\d+$/.test(trimmedValue) && value.length <= 17) {
      setYearlyIncome(Number(trimmedValue).toLocaleString());
    } else if (trimmedValue === "") {
      setYearlyIncome("");
    }
  };

  const handleVisualize = () => {
    setEntryInput(searchInput);
  };

  const handleClickIcon = () => {
    const randomEntryId = Math.floor(Math.random() * entryCount + 1);
    setEntryId(randomEntryId);
  };

  const time = useMemo(() => {
    if (yearlyIncome && money) {
      const income = Number(yearlyIncome.replaceAll(",", ""));
      const dailyIncome = income / 365;
      const totalDays = money / dailyIncome;

      if (totalDays < 30) {
        const days = totalDays.toFixed(2);
        if (days === "1.00") return `${days} day`;
        return `${days} days`;
      } else if (totalDays < 365) {
        const months = (totalDays / 30).toFixed(2);
        if (months === "1.00") return `${months} month`;
        return `${months} months`;
      } else {
        const years = (totalDays / 365).toFixed(2);
        if (years === "1.00") return `${years} year`;
        return `${years} years`;
      }
    }
    return null;
  }, [yearlyIncome, money]);

  useEffect(() => {
    if (entries?.length) {
      setMoney(entries[0].value);
      setEntryId(0);
    }
  }, [entries]);

  useEffect(() => {
    if (entry) {
      setSearchInput(entry.input);
      setMoney(entry.value);
    }
  }, [entry]);

  return (
    <Flex flexDirection="column" alignItems="center">
      <Text>Anything you want</Text>
      <Flex
        mt={3}
        alignItems="center"
        justifyContent="space-between"
        width="100%"
      >
        <Input
          placeholder="I want..."
          value={searchInput}
          onChange={handleOnChangeSearchInput}
          width="90%"
        />

        <RepeatIcon
          boxSize={6}
          sx={{
            cursor: "pointer",
          }}
          onClick={handleClickIcon}
        />
      </Flex>

      {isLoading && <Spinner mt={6} />}

      {money > 0 && (
        <Text mt={6}>is worth approximately ${money.toLocaleString()}.</Text>
      )}

      {money === null && (
        <Flex mt={6} alignItems="center">
          <Text mr={2}>Can&lsquo;t find value for this input.</Text>
          <Tooltip label={entry.original_answer} fontSize="md">
            <QuestionOutlineIcon />
          </Tooltip>
        </Flex>
      )}

      <Button mt={6} onClick={handleVisualize}>
        Visualize
      </Button>

      <Text mt={16}>How much is your yearly income?</Text>
      <Input
        placeholder="$"
        mt={3}
        value={yearlyIncome}
        onChange={handleOnChangeYearlyIncome}
      />

      {time && <Text mt={8}>It would take you {time} to afford it.</Text>}
    </Flex>
  );
};
