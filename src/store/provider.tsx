import type { ReactNode } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/store";

interface AppProviderProps {
  children: ReactNode;
}

const AppProvider = ({ children }: AppProviderProps) => {
  return <ReduxProvider store={store}>{children}</ReduxProvider>;
};

export default AppProvider;
