import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ForumIcon from "@mui/icons-material/Forum";
import MenuIcon from "@mui/icons-material/Menu";
import SchoolIcon from "@mui/icons-material/School";
import {
  AppBar,
  Avatar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import { default as Link } from "next/link";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { useWeb3Context } from "../context/Web3Context";
import LogoLinear from "../public/logo_full.jpg";
import logo from "../public/master_logo.svg";
import MobileDrawer from "./MobileDrawer";
import RenderOnAnonymous from "./RenderOnAnonymous";
import RenderOnAuthenticated from "./RenderOnAuthenticated";
import SmartLink from "./SmartLink";

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
    icon: <SchoolIcon color="primary" />,
  },
  {
    id: 3,
    text: "Community",
    url: "https://discord.com/invite/24my5DbuS9",
    isExternal: true,
    icon: <ForumIcon color="primary" />,
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
  const { connect, disconnect } = useWeb3Context();
  const router = useRouter();

  const closeDrawer = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const openDrawer = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);
  const handleOpenMenu = useCallback(
    (event) => {
      setAnchorEl(event.currentTarget);
    },
    [setAnchorEl]
  );
  const handleCloseMenu = useCallback(() => {
    setAnchorEl(null);
  }, [setAnchorEl]);

  const handleProfileNavigation = useCallback(
    (e) => {
      e.preventDefault();
      handleCloseMenu();
      router.push("/raised-disputes");
    },
    [handleCloseMenu, router]
  );
  const handleDisconnect = useCallback(
    (e) => {
      e.preventDefault();
      handleCloseMenu();
      disconnect();
    },
    [handleCloseMenu, disconnect]
  );

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "white" }}>
      <Container className="AppBar" maxWidth="xl">
        <Toolbar disableGutters>
          <Link href="/" passHref>
            <Box sx={styles.logostyles} component="a">
              <Image src={logo} alt="Resolutio logo" height={65} width={65} />
            </Box>
          </Link>
          {/* Mobile View Start */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={openDrawer}
              color="primary"
            >
              <MenuIcon />
            </IconButton>
            <MobileDrawer
              openDrawer={open}
              closeDrawer={closeDrawer}
              DrawerList={pages}
            />
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
          {/* Mobile View End */}

          {/* Desktop Menu */}
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
              <Box
                key={page.id}
                sx={{ borderRight: 1, color: theme.palette.primary.light }}
              >
                <SmartLink
                  href={page.url}
                  isExternal={page.isExternal}
                  style={{
                    display: "block",
                    borderRadius: 0,
                    padding: "0 0.5rem",
                  }}
                >
                  {page.text}
                </SmartLink>
              </Box>
            ))}
            <RenderOnAnonymous>
              <Box>
                <IconButton aria-label="Wallet Login" onClick={connect}>
                  <AccountBalanceWalletIcon color="primary" />
                </IconButton>
              </Box>
            </RenderOnAnonymous>
            <RenderOnAuthenticated>
              <Box>
                <IconButton
                  aria-label="Wallet Login"
                  onClick={handleOpenMenu}
                  aria-controls={menuOpen ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={menuOpen ? "true" : undefined}
                >
                  <Avatar
                    alt="metamask"
                    src="/metamask.svg"
                    sx={{
                      border: `1px solid ${palette.primary.dark}`,
                      p: ".4rem",
                      width: 36,
                      height: 36,
                    }}
                  />
                </IconButton>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={menuOpen}
                  onClose={handleCloseMenu}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                >
                  <MenuItem onClick={handleProfileNavigation}>
                    <AccountBoxIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="button" color="primary">
                      Profile
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleDisconnect}>
                    <ExitToAppIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="button" color="primary">
                      Disconnect
                    </Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </RenderOnAuthenticated>
          </Box>
          {/* Desktop Menu */}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default AppHeader;
