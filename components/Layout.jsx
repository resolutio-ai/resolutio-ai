import { Box, Container } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import footerTheme from "../styles/theme/footerTheme";
import AppFooter from "./AppFooter";
import AppHeader from "./AppHeader";

const Layout = ({ children }) => {
  return (
    <Box className="root">
      <AppHeader />
      <Container component="main" className="content">{children}</Container>
      <ThemeProvider theme={footerTheme}>
        <AppFooter />
      </ThemeProvider>
    </Box>
  );
};

export default Layout;
