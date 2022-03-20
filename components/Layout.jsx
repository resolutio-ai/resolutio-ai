import AppFooter from "./AppFooter";
import AppHeader from "./AppHeader";

const Layout = ({ children }) => {
  return (
    <>
      <AppHeader />
      <main>{children}</main>
      <AppFooter />
    </>
  );
};

export default Layout;
