"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { DayPassDrawer } from "./day-pass-drawer";

type DayPassContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const DayPassContext = createContext<DayPassContextValue | null>(null);

/** Holds the open state of the Free Day Pass drawer so any button on any page can open it. */
export function DayPassProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const value = useMemo(() => ({ isOpen, open, close }), [isOpen, open, close]);

  return (
    <DayPassContext value={value}>
      {children}
      <DayPassDrawer />
    </DayPassContext>
  );
}

export function useDayPass(): DayPassContextValue {
  const ctx = useContext(DayPassContext);
  if (!ctx) throw new Error("useDayPass must be used inside <DayPassProvider>");
  return ctx;
}
