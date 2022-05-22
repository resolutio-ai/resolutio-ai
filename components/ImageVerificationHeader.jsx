import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import { IMAGE_VERIFICATION_HEADING } from "../constants/strings";
import verificationImage from "../public/verification.svg";

const ImageVerificationHeader = () => {
  return (
    <Box sx={{ textAlign: "center", my: "2rem" }}>
      <Image src={verificationImage} height="100" alt="Verification Image" />
      <Typography variant="h1">{IMAGE_VERIFICATION_HEADING}</Typography>
    </Box>
  );
};

export default ImageVerificationHeader;
