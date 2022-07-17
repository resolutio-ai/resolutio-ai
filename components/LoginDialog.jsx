import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Icon,
  Slide,
  Stack,
} from "@mui/material";
import Image from "next/image";
import * as React from "react";
import { useCallback } from "react";
import { useWalletContext } from "../context/WalletContext";
import metamask from "../public/metamask.svg";
import mobileLogo from "../public/mobile_logo.png";
import ud from "../public/unstoppabledomains.svg";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const metmaskIcon = (
  <Icon sx={{ height: "1.25em", width: "1.25em" }}>
    <Image alt="metamask" src={metamask} />
  </Icon>
);

const udIcon = (
  <Icon sx={{ height: "1.25em", width: "1.25em" }}>
    <Image alt="metamask" src={ud} />
  </Icon>
);

const AlertDialogSlide = ({ open, onClose }) => {
  const { connect, address, disconnect } = useWalletContext();
  const handleLoginwithMetaMask = useCallback(() => {
    console.log("Metamask Login Cliked");
    onClose();
    connect();
  }, [onClose, connect]);

  const handleLoginwithUD = useCallback(() => {
    console.log("UD Login Cliked");
    onClose();
    disconnect();
  }, [onClose, disconnect]);

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={onClose}
        aria-describedby="alert-dialog-slide-description"
        sx={{ "& .MuiDialog-paper": { minWidth: "20rem" } }}
      >
        <DialogTitle align="center" disableT>
          {"Connect Wallet" + address}
        </DialogTitle>
        <DialogContent align="center">
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ maxWidth: "200px" }}
          >
            <Box>
              <Image src={mobileLogo} alt="resolutio" height={44} width={44} />
            </Box>
            <Box>
              <SyncAltIcon color="primary" fontSize="large"></SyncAltIcon>
            </Box>
            <Box>
              <AccountBalanceWalletIcon fontSize="large" color="primary" />
            </Box>
          </Stack>
          <Divider sx={{ my: 4 }} />
          <Box sx={{ width: "15rem" }}>
            <Button
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              startIcon={metmaskIcon}
              onClick={handleLoginwithMetaMask}
            >
              Metamask
            </Button>
            <Button
              variant="outlined"
              fullWidth
              startIcon={udIcon}
              onClick={handleLoginwithUD}
            >
              unstoppable Domains
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AlertDialogSlide;
