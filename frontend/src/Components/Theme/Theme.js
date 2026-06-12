import { createTheme } from "@mui/material";

export const theme = createTheme({
  colorScheme: {
    palette: {
      dark: {
        primary: {
          main: "#3E1A89",
          contrastText: "#fff",
        },
        secondary: {
          main: "rgb(255, 255, 255)",
          contrastText: "#3E1A89",
        },
      },
      light: {
        primary: {
          main: "rgb(255, 255, 255)",
          contrastText: "#3E1A89",
        },
        secondary: {
          main: "#3E1A89",
          contrastText: "#fff",
        },
      },
    },
  },
});
