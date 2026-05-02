"use client";
import { createContext, useContext, type ReactNode } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { ChipStore } from "./types";

const ChipContext = createContext<ChipStore | null>(null);

export function ChipStoreProvider({ children }: { children: ReactNode }) {
  const [balance, setBalance] = useLocalStorage("casino_chip_balance", 1000);

  const store: ChipStore = {
    balance,
    addChips: (amount) => setBalance((prev) => prev + amount),
    deductChips: (amount) => setBalance((prev) => Math.max(0, prev - amount)),
    setBalance,
  };

  return <ChipContext.Provider value={store}>{children}</ChipContext.Provider>;
}

export function useChipStore(): ChipStore {
  const ctx = useContext(ChipContext);
  if (!ctx) throw new Error("useChipStore must be used within ChipStoreProvider");
  return ctx;
}
