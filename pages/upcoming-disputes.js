import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import DisputesList from "../components/disputeResolution/DisputesList";
import NotArbiter from "../components/NotArbiter";
import RenderOnArbiter from "../components/RenderOnArbiter";
import Meta from "../components/seo/Meta";
import Unauthorized from "../components/Unauthorized";
import { DisputePool } from "../integrations/DisputePool";
const UpcomingDisputes = () => {
  const [open, setOpen] = useState(false);

  const openStakeDialog = () => {
    setOpen(true);
  };

  const closeStakeDialog = () => {
    setOpen(false);
  };

  const handleStaking = () => {
    closeStakeDialog();
  };
  const upComingDisputes = [
    {
      id: "1",
      title: "Digital Art",
      description: "Comic created by artist tokenized ...",
      stakeTime: 1655636071,
      isStakeTimeExpired: false,
    },
    {
      id: "2",
      title: "Music",
      description: "Part of the victim's song used ...",
      stakeTime: 1655722471,
      isStakeTimeExpired: false,
    },
    {
      id: "3",
      title: "Movie",
      description: "Copy of the victims short film NFT ...",
      stakeTime: 1655808871,
      isStakeTimeExpired: false,
    },
  ];

  useEffect(() => {
    const getDisputes = async () => {
      const disputePool = new DisputePool();
      const disputes = await disputePool.getNewDisputes();
      console.log(disputes);
      /* console.time("getDisputes");
      const data = await (
        await fetch(
          "https://ipfs.io/ipfs/bafybeifpsxhxgghrsfnkeesg7bv62rc3ok676fgnzvwfcpx5oup5tdsixu/formData.json"
        )
      ).json();
      console.timeEnd("getDisputes");
      console.log(data); */
    };
    getDisputes();
  }, []);

  return (
    <>
      <Meta title="Upcoming Disputes" />
      <RenderOnArbiter>
        <>
          <Box>
            <Typography variant="h1">Upcoming Disputes</Typography>
            <DisputesList
              disputes={upComingDisputes}
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
      <NotArbiter />
      <Unauthorized />
    </>
  );
};

export default UpcomingDisputes;
