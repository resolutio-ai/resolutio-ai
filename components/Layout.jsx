import { Container } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import footerTheme from "../styles/theme/footerTheme";
import AppFooter from "./AppFooter";
import AppHeader from "./AppHeader";

const Layout = ({ children }) => {
  return (
    <>
      <AppHeader />
      <Container component="main">{children}</Container>
      <ThemeProvider theme={footerTheme}>
        <AppFooter />
      </ThemeProvider>
    </>
  );
};

export default Layout;
