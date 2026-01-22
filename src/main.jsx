import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { ThemeContextProvider } from "./context/ThemeContextProvider";
import { AppThemeProvider } from "./context/ThemeProvider";
import { GlobalStyles } from "./styles/globalStyles";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppThemeProvider>
      <ThemeContextProvider>
        <GlobalStyles />
        <App />
      </ThemeContextProvider>
    </AppThemeProvider>
  </React.StrictMode>,
);
