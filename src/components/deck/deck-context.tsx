"use client";

import { createContext, useContext } from "react";

export type DeckState = {
  index: number;
  total: number;
  go: (index: number) => void;
};

export const DeckContext = createContext<DeckState>({ index: 0, total: 1, go: () => {} });

export const useDeck = () => useContext(DeckContext);
