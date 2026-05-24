import { createContext, useContext, type RefObject } from 'react';

interface ScrollContextType {
  scrollContainerRef: RefObject<HTMLDivElement | null>;
}

export const ScrollContext = createContext<ScrollContextType | null>(null);

export function useScrollContainer() {
  return useContext(ScrollContext);
}
