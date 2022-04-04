import React from "react";
//import ComingSoon from "../components/ComingSoon";

import { Box, Button, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import Scroll from "../public/icons8-scroll.svg";

const ResEdPage = () => {
  //return <ComingSoon />;

  return (
    <Box sx={{ textAlign: "center" }}>
      <h2>Res Educate Cohort Programme</h2>
      <p>
        Last year, over $44 billion worth of cryptocurrency was spent on NFTs. Despite the 
        popularity of NFTs, artists, collectors and other stakeholders continue to get 
        confused about rights pertaining to NFTs. Moreover, active groups which discuss NFT 
        rights remain unknown to persons in the NFT Community. To promote conversations and 
        spread awareness on NFT rights, and bridge the gap between stakeholders who seek 
        knowledge and NFT rights experts, we are hosting resolutio’s first res educate 
        cohort programme.{" "}
      </p>
      <h3>Res Ed Cohort 2022 - Announcing soon!</h3>
      </Box>

      );
};

export default ResEdPage;
