import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "../styles/theme";

export function AppThemeProvider({ children }) {
  const [mode, setMode] = useState("light");

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    if (stored) setMode(stored);
    else if (prefersDark) setMode("dark");
  }, []);

  function toggleTheme() {
    setMode((prev) => {
      const next = prev === "light" ? "dark" : "light";
      localStorage.setItem("theme", next);
      return next;
    });
  }

  return (
    <ThemeProvider theme={mode === "dark" ? darkTheme : lightTheme}>
      {children}
    </ThemeProvider>
  );
}
