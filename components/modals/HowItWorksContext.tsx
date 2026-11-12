'use client';

import React, { createContext, useContext, useState } from 'react';
import { HowItWorksModal } from './HowItWorksModal';

interface HowItWorksContextType {
  openHowItWorks: () => void;
  closeHowItWorks: () => void;
  isOpen: boolean;
}

const HowItWorksContext = createContext<HowItWorksContextType>({
  openHowItWorks: () => {},
  closeHowItWorks: () => {},
  isOpen: false,
});

export const useHowItWorks = () => useContext(HowItWorksContext);

export function HowItWorksProvider({ children }: { children: React.ReactNode }) {
  // It acts as the entry notice: a fresh visit or browser refresh starts with it open.
  const [isOpen, setIsOpen] = useState(true);

  return (
    <HowItWorksContext.Provider
      value={{
        isOpen,
        openHowItWorks: () => setIsOpen(true),
        closeHowItWorks: () => setIsOpen(false),
      }}
    >
      {children}
      <HowItWorksModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </HowItWorksContext.Provider>
  );
}
