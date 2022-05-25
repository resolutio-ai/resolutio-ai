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
      {/* <Typography variant="body1">{IMAGE_VERIFICATION_DESC}</Typography> */}
      <Typography variant="body1">
        Verify whether your art has been tokenized or your NFT duplicated
        without consent on <b>Ethereum</b>, <b>Polygon</b> or <b>Tezos</b>{" "}
        blockchains.
      </Typography>
    </Box>
  );
};

export default ImageVerificationHeader;
