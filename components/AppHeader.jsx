import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Tooltip, Typography, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";

import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import Link from 'next/link'
import * as React from "react";


import NextLink from 'next/link'
import { Link as MuiLink } from '@mui/material'

const pages = [
  // { text: "home", url: "/" },
  { text: "Res Educate", url: "/about" },
  { text: "Community", url: "/contact" },
];

const useStyles = (theme) => ({
  textLine: {
    color: theme.palette.primary.contrastText,
  },
  iconStyle: {
    color: theme.text.primary,
    fontSize: '20px',
    cursor: 'pointer'
  },
});
const AppHeader = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
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
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex", cursor: 'pointer' } }}
          >
            <Link href="/">
              <span>resolutio</span>
            </Link>

          </Typography>

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
              {pages.map((page, index) => (
                <MenuItem
                  key={index}
                  onClick={handleCloseNavMenu}
                  className="themeColor"
                >
                  <NextLink href={page.url} passHref >
                    <MuiLink underline="none" color="inherit" sx={{ color: text.primary }}>{page.text}</MuiLink>
                  </NextLink>
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
            <Link href="/">
              <span>resolutio</span>
            </Link>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page, index) => (
              <NextLink href={page.url} passHref key={index}>
                <MuiLink underline="none" color="inherit" sx={{ my: 2, color: text.primary, display: "block", padding: '6px 8px' }}>{page.text}</MuiLink>
              </NextLink>
            ))}
          </Box>

          <NextLink href='/wallet' passHref >
            <MuiLink underline="none" color="inherit" sx={{ my: 2, color: text.primary, display: "block", padding: '6px 8px' }}>
              <Tooltip title="Wallet">
                <AccountBalanceWalletIcon sx={styles.iconStyle} fontSize="large" />
              </Tooltip>
            </MuiLink>
          </NextLink>

        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default AppHeader;
