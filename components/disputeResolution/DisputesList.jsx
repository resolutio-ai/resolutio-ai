import { Box, Grid } from "@mui/material";
import DisputeItem from "./DisputeItem";

const DisputesList = ({ disputes }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Grid container spacing={2}>
        {disputes.map((dispute) => (
          <Grid item md={4} sm={6} xs={12} key={dispute.disputeId._hex}>
            <DisputeItem dispute={dispute} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DisputesList;
