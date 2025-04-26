import { createTheme } from "@mui/material/styles";

/**
 * Application Theme
 *
 * This file defines the global theme for the Quantum-Secured IoT Smart Home System.
 * It establishes consistent colors, typography, and component styling throughout the application.
 */
const theme = createTheme({
  palette: {
    primary: {
      light: "#4f5b92",
      main: "#1a237e", // Deep blue for quantum security feel
      dark: "#000051",
      contrastText: "#ffffff",
    },
    secondary: {
      light: "#5472d3",
      main: "#0d47a1", // Darker blue for secondary actions
      dark: "#002171",
      contrastText: "#ffffff",
    },
    background: {
      default: "#f5f7fa",
      paper: "#ffffff",
    },
    error: {
      main: "#d32f2f",
    },
    warning: {
      main: "#f57c00",
    },
    info: {
      main: "#0288d1",
    },
    success: {
      main: "#388e3c",
    },
  },
  typography: {
    fontFamily: ["Roboto", "Arial", "sans-serif"].join(","),
    h1: {
      fontWeight: 500,
    },
    h2: {
      fontWeight: 500,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      fontWeight: 600,
      textTransform: "none",
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        },
        contained: {
          "&:hover": {
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: 12,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 600,
        },
      },
    },
  },
});

export default theme;
