import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import verificationImage from "../../public/resolution_form.svg";

const DisputeResolutionHeader = () => {
  return (
    <Box sx={{ textAlign: "center", my: "2rem" }}>
      <Image
        src={verificationImage}
        height="100"
        alt="dispute resolution form image"
      />
      <Typography variant="h1">
        Initiate Dispute Resolution against an NFT
      </Typography>
      <Typography variant="body1">
        Provide the NFT Id and the corresponding marketplace namd against which
        you want to initite the claim.
      </Typography>
    </Box>
  );
};

export default DisputeResolutionHeader;
