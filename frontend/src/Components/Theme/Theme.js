import { createTheme } from "@mui/material";

export const theme = createTheme({
  colorScheme: {
    palette: {
      dark: {
        primary: {
          main: "rgb(23, 140, 163)",
          contrastText: "#fff",
        },
        secondary: {
          main: "rgb(255, 255, 255)",
          contrastText: "rgb(23, 140, 163)",
        },
      },
      light: {
        primary: {
          main: "rgb(255, 255, 255)",
          contrastText: "rgb(23, 140, 163)",
        },
        secondary: {
          main: "rgb(23, 140, 163)",
          contrastText: "#fff",
        },
      },
    },
  },
});
