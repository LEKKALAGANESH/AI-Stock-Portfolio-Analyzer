import { useState } from "react";
import { ThemeContext } from "./useTheme";

export function ThemeContextProvider({ children }) {
  const [mode, setMode] = useState("light");

  function toggleTheme() {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  }

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
