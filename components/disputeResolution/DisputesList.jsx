import { Grid } from "@mui/material";
import DisputeItem from "./DisputeItem";

const DisputesList = ({ disputes, openStakeDialog }) => {
  return (
    <Grid container spacing={2}>
      {disputes.map((dispute) => (
        <Grid item md={4} sm={6} xs={12} key={dispute.id}>
          <DisputeItem dispute={dispute} openStakeDialog={openStakeDialog} />
        </Grid>
      ))}
    </Grid>
  );
};

export default DisputesList;
