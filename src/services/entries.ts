import { KeyedMutator } from "swr";
import useSWRImmutable from "swr/immutable";

import { fetcher } from "./fetcher";

import type { Entry } from "@/interfaces/entry.interface";

export function useEntries(input: string): {
  entries: Entry[];
  isLoading: boolean;
  isError: boolean;
  mutate: KeyedMutator<any>;
} {
  const { data, error, isLoading, mutate } = useSWRImmutable(
    input.length
      ? `${process.env.NEXT_PUBLIC_MONEY_VISUALIZER_BE_URL}/entries?input=${input}`
      : null,
    fetcher
  );

  return {
    entries: data,
    isLoading,
    isError: error,
    mutate,
  };
}

export function useEntryCount(): {
  entryCount: number;
  isLoading: boolean;
  isError: boolean;
  mutate: KeyedMutator<any>;
} {
  const { data, error, isLoading, mutate } = useSWRImmutable(
    `${process.env.NEXT_PUBLIC_MONEY_VISUALIZER_BE_URL}/entries/count`,
    fetcher
  );

  return {
    entryCount: data,
    isLoading,
    isError: error,
    mutate,
  };
}

export function useEntryById(id: number): {
  entry: Entry;
  isLoading: boolean;
  isError: boolean;
  mutate: KeyedMutator<any>;
} {
  const { data, error, isLoading, mutate } = useSWRImmutable(
    id
      ? `${process.env.NEXT_PUBLIC_MONEY_VISUALIZER_BE_URL}/entries/${id}`
      : null,
    fetcher
  );

  return {
    entry: data,
    isLoading,
    isError: error,
    mutate,
  };
}
