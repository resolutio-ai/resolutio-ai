import { Box } from "@mui/material";
import Image from "next/image";
import { COMING_SOON_TEXT } from "../constants/strings";
import comingSoonImage from "../public/coming_soon.svg";
import TestUD from "./TestUD";

const ComingSoon = () => {
  return (
    <Box
      sx={{ mx: "auto", mb: "2rem", textAlign: "center", maxWidth: "500px" }}
    >
      <h1>{COMING_SOON_TEXT}</h1>
      <Image src={comingSoonImage} alt="coming Soon Image" />
      <TestUD />
    </Box>
  );
};

export default ComingSoon;
