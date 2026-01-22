/**
 * Professional Dark Theme for Financial Portfolio Analysis
 * Inspired by: Robinhood, Schwab, Interactive Brokers dark modes
 * Focus: Trust, clarity, professionalism
 */

export const theme = {
  colors: {
    // Base colors - Modern vibrant palette
    background: "#1a1f3a",
    backgroundSecondary: "#242b4f",
    surface: "#2a3150",
    surfaceElevated: "#353d66",
    border: "#4d5580",
    borderSubtle: "#3d4466",

    // Text colors - High contrast for readability
    textPrimary: "#ffffff",
    textSecondary: "#a8b2d1",
    textTertiary: "#7d8fb3",
    muted: "#4f5b7c",

    // Primary accent - Vibrant colors
    accent: "#00d4ff",
    accentHover: "#00e5ff",
    accentMuted: "#0099cc",

    // Semantic colors - Vibrant and clear
    success: "#00ff88",
    warning: "#ffaa00",
    error: "#ff3366",
    info: "#4d9fff",

    // Header specific
    headerBg: "#0a0e27",
    headerBorder: "#2a3150",
    headerTextPrimary: "#ffffff",
    headerTextSecondary: "#a8b2d1",

    // Interactive states
    hoverBg: "rgba(0, 212, 255, 0.1)",
    activeBg: "rgba(0, 212, 255, 0.2)",
    primary: "#00d4ff",
    focus: "#4d9fff",

    // Vibrant gradients for each page and component
    gradients: {
      // Upload Page - Purple to Pink
      upload:
        "linear-gradient(135deg, #1a0b2e 0%, #2d1b4e 25%, #4a2c6d 50%, #2d1b4e 75%, #1a0b2e 100%)",

      // Review Page - Teal to Cyan
      review:
        "linear-gradient(135deg, #0d1b2a 0%, #1b3a52 25%, #2a5f7f 50%, #1b3a52 75%, #0d1b2a 100%)",

      // Analyze Page - Blue to Indigo
      analyze:
        "radial-gradient(ellipse at top, #1a237e 0%, #0d1b3d 40%, #0a0e27 100%)",

      // Card gradients - Multiple variants
      card: "linear-gradient(135deg, rgba(0, 212, 255, 0.05) 0%, rgba(138, 43, 226, 0.05) 50%, rgba(255, 0, 128, 0.05) 100%)",

      cardHover: "linear-gradient(135deg, rgba(0, 212, 255, 0.12) 0%, rgba(138, 43, 226, 0.12) 50%, rgba(255, 0, 128, 0.12) 100%)",

      cardPurple: "linear-gradient(135deg, #2d1b4e 0%, #3d2b5e 100%)",

      cardTeal: "linear-gradient(135deg, #1b3a52 0%, #2a5f7f 100%)",

      cardBlue: "linear-gradient(135deg, #1a237e 0%, #2d3a9f 100%)",

      surface: "linear-gradient(145deg, #1a1f3a 0%, #242b4f 100%)",

      // Button gradients - Vibrant
      button: "linear-gradient(135deg, #00d4ff 0%, #0099ff 100%)",

      buttonSuccess: "linear-gradient(135deg, #00ff88 0%, #00cc6a 100%)",

      buttonPurple: "linear-gradient(135deg, #b537f2 0%, #8a2be2 100%)",

      header: "linear-gradient(90deg, #0a0e27 0%, #141937 50%, #0a0e27 100%)",

      // Section-specific gradients
      tableGradient: "linear-gradient(145deg, rgba(0, 212, 255, 0.03) 0%, rgba(77, 159, 255, 0.03) 100%)",

      helpSection: "linear-gradient(135deg, rgba(181, 55, 242, 0.08) 0%, rgba(0, 212, 255, 0.08) 100%)",
    },
  },

  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    xxl: "2.5rem",
    xxxl: "3rem",
  },

  radius: {
    sm: "6px",
    md: "8px",
    lg: "12px",
    xl: "16px",
  },

  typography: {
    caption: "0.75rem",
    body: "0.95rem",
    label: "1rem",
    subheading: "1.1rem",
    heading: "1.6rem",
    display: "2rem",
  },

  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  motion: {
    fast: "150ms cubic-bezier(0.4, 0, 0.2, 1)",
    normal: "250ms cubic-bezier(0.4, 0, 0.2, 1)",
    slow: "400ms cubic-bezier(0.4, 0, 0.2, 1)",
  },

  shadows: {
    sm: "0 1px 3px rgba(0, 0, 0, 0.4)",
    md: "0 4px 12px rgba(0, 0, 0, 0.5)",
    lg: "0 8px 24px rgba(0, 0, 0, 0.6)",
    focus: "0 0 0 3px rgba(31, 111, 235, 0.4)",
  },

  breakpoints: {
    mobile: "600px",
    tablet: "900px",
    desktop: "1200px",
  },

  semantic: {
    low: {
      bg: "rgba(0, 255, 136, 0.12)",
      border: "rgba(0, 255, 136, 0.4)",
      text: "#00ff88",
    },
    medium: {
      bg: "rgba(255, 170, 0, 0.12)",
      border: "rgba(255, 170, 0, 0.4)",
      text: "#ffaa00",
    },
    high: {
      bg: "rgba(255, 51, 102, 0.12)",
      border: "rgba(255, 51, 102, 0.4)",
      text: "#ff3366",
    },
    neutral: {
      bg: "rgba(168, 178, 209, 0.12)",
      border: "rgba(168, 178, 209, 0.3)",
      text: "#a8b2d1",
    },
  },

  signal: {
    underweight: {
      bg: "rgba(0, 255, 136, 0.15)",
      border: "rgba(0, 255, 136, 0.5)",
      text: "#00ff88",
    },
    balanced: {
      bg: "rgba(255, 170, 0, 0.15)",
      border: "rgba(255, 170, 0, 0.5)",
      text: "#ffaa00",
    },
    overweight: {
      bg: "rgba(255, 51, 102, 0.15)",
      border: "rgba(255, 51, 102, 0.5)",
      text: "#ff3366",
    },
    // Legacy support
    buy: {
      bg: "rgba(0, 255, 136, 0.15)",
      border: "rgba(0, 255, 136, 0.5)",
      text: "#00ff88",
    },
    hold: {
      bg: "rgba(255, 170, 0, 0.15)",
      border: "rgba(255, 170, 0, 0.5)",
      text: "#ffaa00",
    },
    sell: {
      bg: "rgba(255, 51, 102, 0.15)",
      border: "rgba(255, 51, 102, 0.5)",
      text: "#ff3366",
    },
  },
};

// Legacy exports for backwards compatibility
export const baseTheme = theme;
export const darkTheme = theme;
export const lightTheme = theme;
