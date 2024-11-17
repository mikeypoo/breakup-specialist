import { createContext } from "react";

export const AppContext = createContext({
  toggleTheme: () => {},
  openCalendly: () => {},
  openLinkedIn: () => {},
  viewModel: {},
});
