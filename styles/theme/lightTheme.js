import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
  text: {
    primary: 'green',
    secondary: '#46505A',
  },
  typography: {
    h5: {
      fontWeight: "bold",
    },
  },
});

export default lightTheme;
