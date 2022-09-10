import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from "@mui/material";
import { useCallback, useState } from "react";
import RenderOnAnonymous from "./RenderOnAnonymous";
import RenderOnArbiter from "./RenderOnArbiter";
import RenderOnAuthenticated from "./RenderOnAuthenticated";

const LoginModule = ({ connect, disconnect, router, size = 36 }) => {
  const theme = useTheme();
  const { palette } = theme;
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
      router.push("/profile");
    },
    [handleCloseMenu, router]
  );

  const handleArbiterNavigation = useCallback(
    (e) => {
      e.preventDefault();
      handleCloseMenu();
      router.push("/upcoming-disputes");
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
    <>
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
                width: size,
                height: size,
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
            <RenderOnArbiter>
              <MenuItem onClick={handleArbiterNavigation}>
                <HistoryEduIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="button" color="primary">
                  Arbiter disputes
                </Typography>
              </MenuItem>
            </RenderOnArbiter>
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
    </>
  );
};

export default LoginModule;
