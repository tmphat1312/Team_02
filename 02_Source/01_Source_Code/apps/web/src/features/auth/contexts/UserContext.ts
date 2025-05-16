import React from "react";

import { User } from "@/typings/models";

export const UserContext = React.createContext<User | null>(null);

export const useUserContext = () => {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
