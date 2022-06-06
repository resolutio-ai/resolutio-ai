import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Link as MuiLink,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import { default as Link, default as NextLink } from "next/link";
import { useState } from "react";
import LogoLinear from "../public/logo_full.jpg";
import logo from "../public/logo_icon.png";

const pages = [
  /*  { id: 1, text: DISPUTE_RESOLUTION, url: "/initiate-dispute", isExternal: false }, */
  { id: 2, text: "Res Ed", url: "/res-ed", isExternal: false },
  {
    id: 3,
    text: "Community",
    url: "https://discord.com/invite/24my5DbuS9",
    isExternal: true,
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
    color: theme.text.primary,
    fontSize: "20px",
    cursor: "pointer",
    ml: "5px",
  },
});
const AppHeader = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const theme = useTheme();
  const { text } = theme;

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const styles = useStyles(theme);

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

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
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            {/* Mobile view */}
            <Menu
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
                      sx={{ color: text.primary }}
                      rel={page.isExternal ? "noopener" : ""}
                    >
                      {page.text}
                    </MuiLink>
                  </NextLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Link href="/" passHref>
            <Box
              component="a"
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none" },
                textDecoration: "none",
                color: theme.palette.primary.main,
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
              <>
                <Link href={page.url} key={page.id} passHref>
                  <Button
                    target={page.isExternal ? "_blank" : ""}
                    rel={page.isExternal ? "noopener" : ""}
                    onClick={handleCloseNavMenu}
                    className="themeColor"
                    sx={{ my: 2, color: text.primary, display: "block" }}
                  >
                    {page.text}
                  </Button>
                </Link>
                {"|"}
              </>
            ))}
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
