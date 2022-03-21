import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
  typography: {
    h5: {
      fontWeight: "bold",
    },
  },
});

export default lightTheme;
