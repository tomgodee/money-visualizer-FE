"use client";
import { SWRConfig } from "swr";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { fetcher } from "@/services/fetcher";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider>
        <SWRConfig
          value={{
            fetcher: fetcher,
          }}
        >
          {children}
        </SWRConfig>
      </ChakraProvider>
    </CacheProvider>
  );
}
