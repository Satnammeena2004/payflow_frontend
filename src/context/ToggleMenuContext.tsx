import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

export const ToggleProviderContext = createContext<{
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen?: Dispatch<SetStateAction<boolean>>;
}>({
  isMobileMenuOpen: false,
});

export const ToggleProvider = ({ children }: { children: ReactNode }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  return (
    <ToggleProviderContext.Provider
      value={{ isMobileMenuOpen, setIsMobileMenuOpen }}
    >
      {children}
    </ToggleProviderContext.Provider>
  );
};

export const useToggleMenu = () => {
  const context = useContext(ToggleProviderContext);
  if (!context) {
    throw new Error("useToggleMenu must be used within a ToggleProvider");
  }
  return context;
};
