import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import verificationImage from "../public/verification.svg";

const ImageVerificationHeader = () => {
  return (
    <Box sx={{ textAlign: "center", my: "2rem" }}>
      <Image src={verificationImage} height="100" alt="Verification Image" />
      <Typography variant="h1">Image Verification</Typography>
    </Box>
  );
};

export default ImageVerificationHeader;
