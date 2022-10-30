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
import { useResolutioContext } from "../context/ResolutioContext";
import { DisputePool } from "../integrations/DisputePool";
const UpcomingDisputes = () => {
  const { address } = useResolutioContext();
  const [open, setOpen] = useState(false);
  const [upComingDisputes, setUpComingDisputes] = useState([]);

  const openStakeDialog = () => {
    setOpen(true);
  };

  const closeStakeDialog = () => {
    setOpen(false);
  };

  const handleStaking = () => {
    closeStakeDialog();
  };

  useEffect(() => {
    const asyncGetDisputes = async () => {
      if (!address) {
        return
      }
      const disputeSystem = new DisputePool();
      const disputes = await disputeSystem.getNewDisputes();
      let mappedDisputes = disputes.map((dispute) => {
        const {
          arbiterCount,
          createdAt,
          creator,
          disputeId,
          disputePool,
          selectedArbiters,
          state,
          uri,
          winningProposal,
        } = dispute;
        return {
          title: "",
          description: "",
          hasStaked: disputePool.includes(address),
          arbiterCount,
          createdAt,
          creator,
          disputeId,
          disputePool,
          selectedArbiters,
          state,
          uri,
          winningProposal,
        };
      });
      setUpComingDisputes(mappedDisputes);
      console.log("getDisputes", disputes);

      Promise.all(
        disputes.map(dispute => fetch(`${dispute.uri}/dispute.json`))
      )
        .then(function (responses) {
          // Get a JSON object from each of the responses
          return Promise.all(responses.map(function (response) {
            if (response.status === 200)
              return response.json();
            return null;
          }));
        }).catch(function (error) {
          console.log('api error', error);
          return error;
        })
        .then(function (data) {
          // Log the data to the console
          console.log('multi data', data);
          mappedDisputes.forEach((element, index) => {
            element.additionalDetails = data[index];
          });
          console.log(mappedDisputes);
        }).catch(function (error) {
          console.log(error);
        });

      console.timeEnd("getDisputes");
    };
    asyncGetDisputes();
  }, [address]);

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
