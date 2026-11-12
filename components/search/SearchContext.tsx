'use client';

import React, { createContext, useContext, useState } from 'react';

interface SearchContextType {
  isSearchOpen: boolean;
  searchTerm: string;
  toggleSearch: () => void;
  setSearchTerm: (value: string) => void;
}

const SearchContext = createContext<SearchContextType>({
  isSearchOpen: false,
  searchTerm: '',
  toggleSearch: () => {},
  setSearchTerm: () => {},
});

export const useSiteSearch = () => useContext(SearchContext);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <SearchContext.Provider
      value={{
        isSearchOpen,
        searchTerm,
        toggleSearch: () => setIsSearchOpen((isOpen) => !isOpen),
        setSearchTerm,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
