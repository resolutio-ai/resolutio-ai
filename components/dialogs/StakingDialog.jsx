import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

const StakingDialog = ({ open, onClose, onAction }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" sx={{ textAlign: "center" }}>
        {"Want to be an artbiter for this dispute?"}
      </DialogTitle>
      <DialogContent sx={{ textAlign: "center" }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6">Dispute Summary</Typography>
          <Typography variant="body1">
            Victim’s comic, which was first published on their social media page
            in 2020, was allegedly minted as an NFT by another on 13 Feb 2022.{" "}
          </Typography>
        </Box>
        <Box>
          <Typography variant="h6">Stake</Typography>
          <Typography variant="body1">
            Stake <b>60 MATIC</b> to participate in the arbiter selection
            process?
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", pb: 4 }}>
        <Button onClick={onClose} variant="contained" color="secondary">
          No
        </Button>
        <Button onClick={onAction} autoFocus variant="contained">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StakingDialog;
