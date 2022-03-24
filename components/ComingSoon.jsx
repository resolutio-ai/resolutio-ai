import { Box } from "@mui/material";
import Image from "next/image";
import React from "react";
import comingSoonImage from "../public/coming_soon.svg";

const ComingSoon = () => {
  return (
    <Box sx={{ mx: "auto", textAlign: "center", maxWidth: "500px" }}>
      <h1>Coming soon!</h1>
      <Image src={comingSoonImage} alt="coming Soon Image" />
    </Box>
  );
};

export default ComingSoon;
