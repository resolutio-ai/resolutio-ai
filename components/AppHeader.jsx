import ForumIcon from "@mui/icons-material/Forum";
import MenuIcon from "@mui/icons-material/Menu";
import SchoolIcon from "@mui/icons-material/School";
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Toolbar,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import { default as Link } from "next/link";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { useResolutioContext } from "../context/ResolutioContext";
import desktopLogo from "../public/master_logo.svg";
import mobileLogo from "../public/mobile_logo.png";
import LoginModule from "./LoginModule";
import MobileDrawer from "./MobileDrawer";
import SmartLink from "./SmartLink";

const pages = [
  /*  { id: 1, text: DISPUTE_RESOLUTION, url: "/initiate-dispute", isExternal: false }, */
  /*  {
    id: 1,
    text: "Arbiter Disputes",
    url: "/raised-disputes",
    isExternal: false,
  }, 
  {
    id: 2,
    text: "Res Ed",
    url: "/res-ed",
    isExternal: false,
    icon: <SchoolIcon color="primary" />,
  },*/
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
  const { connect, disconnect } = useResolutioContext();
  const router = useRouter();

  const closeDrawer = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const openDrawer = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "white" }}>
      <Container className="AppBar" maxWidth="xl">
        <Toolbar disableGutters>
          <Link href="/" passHref>
            <Box sx={styles.logostyles} component="a">
              <Image
                src={desktopLogo}
                alt="Resolutio logo"
                height={65}
                width={65}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOMd66vBwADzAGiDaTe+gAAAABJRU5ErkJggg=="
              />
            </Box>
          </Link>
          {/* Mobile View Start */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box>
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
            <Box>
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
                  <Image
                    src={mobileLogo}
                    alt="resolutio"
                    height={36}
                    width={36}
                  />
                </Box>
              </Link>
            </Box>
            <Box>
              <LoginModule
                connect={connect}
                disconnect={disconnect}
                router={router}
                size={34}
              />
            </Box>
          </Box>
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
            <LoginModule
              connect={connect}
              disconnect={disconnect}
              router={router}
            />
          </Box>
          {/* Desktop Menu */}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default AppHeader;
