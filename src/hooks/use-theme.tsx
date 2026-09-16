import { createContext, useContext, ReactNode } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Dark is the site's fixed default: always applied, independent of the
// visitor's system preference.
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  document.documentElement.classList.add("dark");
  document.documentElement.classList.remove("light");

  return (
    <ThemeContext.Provider value={{ theme: "dark" as Theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
