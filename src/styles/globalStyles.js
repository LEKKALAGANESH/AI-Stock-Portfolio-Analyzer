import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
    padding: 0;
    font-family: system-ui, -apple-system, BlinkMacSystemFont,
      "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.textPrimary};
    line-height: 1.5;
  }

  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4 {
    margin: 0;
    font-weight: 600;
    line-height: 1.25;
  }

  p {
    margin: 0;
  }

  button {
    font-family: inherit;
  }

  table {
    border-spacing: 0;
  }

  :focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    * {
      animation: none !important;
      transition: none !important;
    }
  }

  /* Ensure readable base font size */
html {
  font-size: 16px;
}

/* Improve default text rendering */
body {
  line-height: 1.5;
}

/* Ensure links and buttons are clearly focusable */
a,
button {
  cursor: pointer;
}

/* Remove focus only for mouse users, keep for keyboard */
:focus:not(:focus-visible) {
  outline: none;
}

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

`;
