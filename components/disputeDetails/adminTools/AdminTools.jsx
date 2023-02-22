import { Box, Button, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useCallback } from "react";
import { useResolutioBackdropContext } from "../../../context/ResolutioBackdropContext";
import DisputeNFT from "../../../integrations/DisputeNFT";

import DisputePool from "../../../integrations/DisputePool";
import DisputeStatusStepper from "./DisputeStatusStepper";

const AdminTools = (data) => {

  const { enqueueSnackbar } = useSnackbar();
  const { openBackdrop, closeBackdrop } = useResolutioBackdropContext();
  const ADMIN_ACTION = {
    1: 'CHANGE_STATE',
    2: 'END_VOTING',
    3: 'ASSIGN_ARBITER'
  }
  console.log('id', data.id, data.dispute);

  const changeDisputeState = useCallback(
    (e) => {
      console.log('id', data.id);
      const disputeStateAsync = async () => {
        if (!data.id) return;
        openBackdrop("Hold on, State is being...");
        const disputeID = Number(data.id);
        console.log('params', disputeID);
        openBackdrop("Hold on, Dispute state is being changed...");
        try {
          const disputeSystem = new DisputePool();
          const dispute = await disputeSystem.changeDisputeState(disputeID, '1');
          // ToDo club all function to 1
          // switch (action) {
          //   case value:

          //     break;

          //   default:
          //     break;
          // }
          console.log('response', dispute);
        } catch (error) {
          enqueueSnackbar("Could not toggle state for dispute", { variant: "error" });
          console.log(error);
        } finally {
          closeBackdrop();
        }
      };
      disputeStateAsync();
    },
    [closeBackdrop, data.id, enqueueSnackbar, openBackdrop]
  );

  const handleEndVote = useCallback(
    () => {
      console.log('id', data.id);
      const votingStateAsync = async () => {
        if (!data.id) return;
        const disputeID = Number(data.id);
        console.log('params', disputeID);
        openBackdrop("Hold on, Voting stage is being closed...");
        try {
          const disputeSystem = new DisputePool();
          const dispute = await disputeSystem.endVoting(disputeID);
          console.log('response', dispute);
        } catch (error) {
          enqueueSnackbar("Could not end voting for dispute", { variant: "error" });
          console.log(error);
        } finally {
          closeBackdrop();
        }
      };
      votingStateAsync();
    },
    [closeBackdrop, data.id, enqueueSnackbar, openBackdrop]
  );
  const handleAssignArbiter = useCallback(
    () => {
      console.log('id', data.id);
      const assignArbiterAsync = async () => {
        if (!data.id) return;
        const disputeID = Number(data.id);
        console.log('params', disputeID);
        openBackdrop("Hold on, Arbiters are being assigned...");
        try {

          const rndInt = randomIntFromInterval(1, 100)
          console.log(rndInt)
          const disputeSystem = new DisputePool();
          const dispute = await disputeSystem.assignRandomArbiters(disputeID, [4, 18, 2]);
          console.log('response', dispute);
        } catch (error) {
          enqueueSnackbar("Could not add Arbiter for dispute", { variant: "error" });
          console.log(error);
        } finally {
          closeBackdrop();
        }
      };
      assignArbiterAsync();
    },
    [closeBackdrop, data.id, enqueueSnackbar, openBackdrop]
  );

  function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }



  return (
    <>
      <Box
        sx={{ mx: "2rem", textAlign: "center", display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <DisputeStatusStepper disputeID={data.id} dispute={data.dispute} />
        {/* <Button variant="contained" color="primary" sx={{ my: 0 }} onClick={handleEndVote}>
          <Typography variant="h7" color="white" >
            End Vote
          </Typography>
        </Button>
        <Button variant="contained" color="primary" sx={{ my: 0 }} onClick={changeDisputeState}>
          <Typography variant="h7" color="white" >
            Change State
          </Typography>
        </Button>
        <Button variant="contained" color="primary" sx={{ my: 0 }} onClick={handleAssignArbiter}>
          <Typography variant="h7" color="white" >
            Assign Arbiters
          </Typography>
        </Button> */}
      </Box>
    </>
  );
};

export default AdminTools;
