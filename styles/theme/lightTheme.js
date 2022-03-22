import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
  text: {
    primary: '#3e6085',
    secondary: '#FFA136',
  },
  typography: {
    h5: {
      fontWeight: "bold",
    },
  },
});

export default lightTheme;
