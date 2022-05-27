import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#604583",
      light: "#7c63a0",
      dark: "#b5abd4"
    }
  },
  text: {
    primary: "#604583",
    secondary: "#fdc870",
  },
  typography: {
    h1: { fontSize: "2.5rem", fontWeight: 500, margin: "1rem 0" },
    h5: {
      fontWeight: 500,
    },
  },
});

export default lightTheme;
