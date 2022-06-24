import ForumIcon from "@mui/icons-material/Forum";
import MenuIcon from "@mui/icons-material/Menu";
import SchoolIcon from "@mui/icons-material/School";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import { default as Link } from "next/link";
import { Fragment, useCallback, useState } from "react";
import { useWeb3 } from "../hooks/useWeb3";
import LogoLinear from "../public/logo_full.jpg";
import logo from "../public/master_logo.svg";
import MobileDrawer from "./MobileDrawer";

const pages = [
  /*  { id: 1, text: DISPUTE_RESOLUTION, url: "/initiate-dispute", isExternal: false }, */
  /*  {
    id: 1,
    text: "Arbiter Disputes",
    url: "/raised-disputes",
    isExternal: false,
  }, */
  {
    id: 2,
    text: "Res Ed",
    url: "/res-ed",
    isExternal: false,
    icon: <SchoolIcon />,
  },
  {
    id: 3,
    text: "Community",
    url: "https://discord.com/invite/24my5DbuS9",
    isExternal: true,
    icon: <ForumIcon />,
  },
  // { id: 3, text: IMAGE_VERIFICATION_HEADING, url: "/image-verification" },
];

const useStyles = (theme) => ({
  logostyles: {
    marginTop: ".5rem",
    display: { xs: "none", md: "block" },
  },
  textLine: {
    color: theme.palette.primary.contrastText,
  },
  iconStyle: {
    color: theme.palette.primary.dark,
    fontSize: "20px",
    cursor: "pointer",
    ml: "5px",
  },
});
const AppHeader = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const { palette } = theme;
  const styles = useStyles(theme);
  const { web3Provider, connect, disconnect } = useWeb3();

  const closeDrawer = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const openDrawer = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  return (
    <AppBar position="sticky">
      <Container className="AppBar">
        <Toolbar disableGutters>
          <Link href="/" passHref>
            <Box sx={styles.logostyles} component="a">
              <Image src={logo} alt="Resolutio logo" height={65} width={65} />
            </Box>
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={openDrawer}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <MobileDrawer
              openDrawer={open}
              closeDrawer={closeDrawer}
              DrawerList={pages}
            />
            {/* Mobile view */}
            {/*             <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.id}
                  onClick={handleCloseNavMenu}
                  className="themeColor"
                >
                  <NextLink href={page.url} passHref>
                    <MuiLink
                      target={page.isExternal ? "_blank" : ""}
                      underline="none"
                      color="inherit"
                      sx={{ color: palette.primary.dark }}
                      rel={page.isExternal ? "noopener" : ""}
                    >
                      {page.text}
                    </MuiLink>
                  </NextLink>
                </MenuItem>
              ))}
            </Menu> */}
          </Box>
          <Link href="/" passHref>
            <Box
              component="a"
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none" },
                textDecoration: "none",
                color: palette.primary.main,
              }}
            >
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
              >
                <Image
                  src={LogoLinear}
                  alt="resolutio"
                  height={27}
                  width={175}
                />
              </Typography>
            </Box>
          </Link>
          {/* Desktop menu */}
          <Box
            sx={{
              flexGrow: 1,
              display: {
                xs: "none",
                md: "flex",
                alignItems: "baseline",
                justifyContent: "flex-end",
              },
            }}
          >
            {pages.map((page) => (
              <Fragment key={page.id}>
                <Link href={page.url} passHref>
                  <Button
                    target={page.isExternal ? "_blank" : ""}
                    rel={page.isExternal ? "noopener" : ""}
                    className="themeColor"
                    sx={{
                      my: 2,
                      color: palette.primary.dark,
                      display: "block",
                    }}
                  >
                    {page.text}
                  </Button>
                </Link>
                {"|"}
              </Fragment>
            ))}
            {web3Provider ? (
              <Button onClick={disconnect} variant="contained">
                Disconnect
              </Button>
            ) : (
              <Button onClick={connect} variant="contained">
                Connect
              </Button>
            )}
          </Box>
          {/* <Link href="/wallet" passHref>
            <Button
              className="themeColor"
              sx={{
                my: 2,
                color: text.primary,
                display: "flex",
                padding: "6px 8px",
              }}
            >
              <AccountBalanceWalletIcon
                sx={styles.iconStyle}
                fontSize="large"
              />
            </Button>
          </Link> */}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default AppHeader;
