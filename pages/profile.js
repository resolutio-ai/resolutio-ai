import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import DisputesList from "../components/disputeResolution/DisputesList";
import RenderOnArbiter from "../components/RenderOnAuthenticated";
import Meta from "../components/seo/Meta";
import Unauthorized from "../components/Unauthorized";
import ARBITER from "../constants/constants";

const RaisedDisputes = () => {
  const [open, setOpen] = useState(false);

  const openStakeDialog = () => {
    setOpen(true);
  };

  const closeStakeDialog = () => {
    setOpen(false);
  };

  const handleStaking = () => {
    console.log("Staked");
    closeStakeDialog();
  };
  const onGoingDisputes = [
    {
      id: "1",
      title: "DA 01",
      description: "Comic created by artist tokenized ...",
      stakeTime: 1655463271,
      isStakeTimeExpired: true,
    },
    {
      id: "2",
      title: "DA 06",
      description: "Part of the victim's song used ...",
      stakeTime: 1655549671,
      isStakeTimeExpired: true,
    },
  ];
  return (
    <>
      <Meta title="Raised Disputes" />
      <RenderOnArbiter>
        <>
          <Box>
            <Typography variant="h1">Ongoing Disputes</Typography>
            <DisputesList
              disputes={onGoingDisputes}
              openStakeDialog={openStakeDialog}
            />
          </Box>

          <Dialog
            open={open}
            onClose={closeStakeDialog}
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
                  Victim’s comic, which was first published on their social
                  media page in 2020, was allegedly minted as an NFT by another
                  on 13 Feb 2022.{" "}
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
              <Button
                onClick={closeStakeDialog}
                variant="contained"
                color="secondary"
              >
                No
              </Button>
              <Button onClick={handleStaking} autoFocus variant="contained">
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </>
      </RenderOnArbiter>
      <Unauthorized type={ARBITER} />
    </>
  );
};

export default RaisedDisputes;
