import { createTheme } from "@mui/material/styles";
import {
  primaryDark,
  primaryLight,
  primaryMain,
  secondaryDark,
  secondaryLight,
  secondaryMain,
} from "../colors";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: primaryMain,
      light: primaryLight,
      dark: primaryDark,
    },
    secondary: {
      main: secondaryMain,
      light: secondaryLight,
      dark: secondaryDark,
    },
  },
  typography: {
    h1: { fontSize: "2.5rem", fontWeight: 500, margin: "1rem 0" },
    h5: {
      fontWeight: 500,
    },
  },
});

export default lightTheme;
