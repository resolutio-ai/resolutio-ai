import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { STAKE } from "../../constants/constants";

const StakingDialog = ({ open, onClose, onAction, description }) => {
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
          <Typography variant="body1">{description}</Typography>
        </Box>
        <Box>
          <Typography variant="h6">Stake</Typography>
          <Typography variant="body1">
            Stake <b>{STAKE} MATIC</b> to participate in the arbiter selection
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
