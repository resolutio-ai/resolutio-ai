import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import Sneha from "../public/sneha.jpg";
import Zarreen from "../public/zarreen.jpg";

const OurTeam = () => {
  return (
    <Box sx={{ textAlign: "center", my: 4 }}>
      <Typography variant="h5">Meet Our Team</Typography>
      <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
        <Box sx={{ mr: 2 }}>
          <Image
            src={Sneha}
            alt="Landscape picture"
            width={250}
            height={250}
            objectFit="cover"
          />
          <Typography variant="h6">Sneha Vijayan</Typography>
        </Box>
        <Box sx={{ ml: 2 }}>
          <Image
            src={Zarreen}
            alt="Landscape picture"
            width={250}
            height={250}
            objectFit="cover"
          />
          <Typography variant="h6">Zarreen Reza</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default OurTeam;
