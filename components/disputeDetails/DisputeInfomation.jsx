import { Box, Typography } from "@mui/material";

const DisputeInfomation = ({ dispute }) => {
  return (
    <Box>
      <Typography
        variant="h1"
        sx={{ textAlign: "center" }}
      >{`Case Id: ${dispute.disputeId}`}</Typography>
      <Box>
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          {dispute.description}
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          <strong>Victim:</strong> {dispute.creator}
        </Typography>
        {dispute.additionalDetails &&
          Object.keys(dispute.additionalDetails).map((key) => {
            return (
              <Typography variant="body1" sx={{ mt: 2 }} key={key}>
                <strong>{`${key}: `}</strong>
                {dispute.additionalDetails[key]}
              </Typography>
            );
          })}
      </Box>
    </Box>
  );
};

export default DisputeInfomation;
