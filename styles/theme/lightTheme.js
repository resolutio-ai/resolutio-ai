import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
  text: {
    primary: "#3e6085",
    secondary: "#FFA136",
  },
  typography: {
    h1: { fontSize: "2.5rem", fontWeight: 500, margin: "1rem 0" },
    h5: {
      fontWeight: 500,
    },
  },
});

export default lightTheme;
