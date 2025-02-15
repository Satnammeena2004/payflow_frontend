import { createContext, ReactNode, SetStateAction, useState } from "react";

type Theme = "dark" | "light";

export const ThemeContext = createContext<{
  theme: Theme;
  setTheme?: SetStateAction<Theme>;
}>({
  theme: "light",
});

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("dark");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
