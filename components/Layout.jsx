import { Box, Container } from "@mui/material";
import AppFooter from "./AppFooter";
import AppHeader from "./AppHeader";
import ScrollToTop from "./ScrollToTop";

const Layout = ({ children }) => {
  return (
    <Box className="root">
      <AppHeader />
      <ScrollToTop />
      <Container component="main" className="content">
        {children}
      </Container>
      <AppFooter />
    </Box>
  );
};

export default Layout;
