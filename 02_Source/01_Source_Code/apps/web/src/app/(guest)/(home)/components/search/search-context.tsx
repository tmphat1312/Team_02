import React from "react";

export const SearchContext = React.createContext({
  searchValue: "",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setSearchValue: (value: string): void => {},
  suggestedOpen: false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setSuggestedOpen: (value: boolean): void => {},
  guestsOpen: false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setGuestsOpen: (value: boolean): void => {},
  guests: 0,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setGuests: (value: number): void => {},
  searchOpen: false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setSearchOpen: (value: boolean): void => {},
  lat: null as number | null,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setLat: (value: number | null): void => {},
  lng: null as number | null,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setLng: (value: number | null): void => {},
});

export function useSearchContext() {
  const context = React.useContext(SearchContext);
  if (!context) {
    throw new Error("useSearchContext must be used within a SearchProvider");
  }
  return context;
}
