import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Typography, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Link from "next/link";
import * as React from "react";

const pages = [
  { text: "Res Educate", url: "/about" },
  { text: "Community", url: "/contact" },
];

const useStyles = (theme) => ({
  logostyles: {
    textDecoration: "none",
    color: theme.palette.primary.main,
  },
  textLine: {
    color: theme.palette.primary.contrastText,
  },
  iconStyle: {
    color: theme.text.primary,
    fontSize: "20px",
    ml: "5px",
  },
});
const AppHeader = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
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
              <Typography
                variant="h6"
                noWrap
                sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
              >
                resolutio
              </Typography>
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
                  key={page.text}
                  onClick={handleCloseNavMenu}
                  className="themeColor"
                >
                  <Typography textAlign="center">{page.text}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            resolutio
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Link href={page.url} key={page.text} passHref>
                <Button
                  onClick={handleCloseNavMenu}
                  className="themeColor"
                  sx={{ my: 2, color: text.primary, display: "block" }}
                >
                  {page.text}
                </Button>
              </Link>
            ))}
          </Box>
          <Link href="/about" passHref>
            <Button
              className="themeColor"
              sx={{ my: 2, color: text.primary, display: "block" }}
            >
              Verify NFT
            </Button>
          </Link>
          {"|"}
          <Link href="/about" passHref>
            <Button
              className="themeColor"
              sx={{ my: 2, color: text.primary, display: "block" }}
            >
              Initiate Dispute
            </Button>
          </Link>
          {"|"}
          <AccountBalanceWalletIcon sx={styles.iconStyle} fontSize="large" />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default AppHeader;
