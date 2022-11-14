import { Box, Button, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import StakingDialog from "../dialogs/StakingDialog";

const Staking = ({ description, handleJoinDisputePool }) => {
  const [isStakingDialogOpen, setStakingDialogOpen] = useState(false);

  const handleStakingDialogOpen = useCallback(() => {
    setStakingDialogOpen(true);
  }, []);

  const handleStakingDialogClose = useCallback(() => {
    setStakingDialogOpen(false);
  }, []);

  const joinDisputePool = useCallback(() => {
    handleStakingDialogClose();
    handleJoinDisputePool();
  }, [handleJoinDisputePool, handleStakingDialogClose]);

  return (
    <>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h5">
          Would you like to be an arbiter for this case ?
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleStakingDialogOpen}
        >
          Stake
        </Button>
      </Box>
      <StakingDialog
        open={isStakingDialogOpen}
        onClose={handleStakingDialogClose}
        onAction={joinDisputePool}
        description={description}
      />
    </>
  );
};

export default Staking;
