import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import verificationImage from "../../public/resolution_form.svg";

const DetailsResolutionHeader = () => {
  return (
    <Box sx={{ textAlign: "center", my: "2rem" }}>
      <Image
        src={verificationImage}
        height="100"
        alt="Details resolution form image"
      />
      <Typography variant="h1">
        Apply to become an arbiter
      </Typography>
      <Typography variant="body1">
        Provide the details and we will get back to you once approved
      </Typography>
    </Box>
  );
};

export default DetailsResolutionHeader;
