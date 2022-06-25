import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import image401 from "../public/401.svg";
import SmartLink from "./SmartLink";

const Unauthorized = () => {
  return (
    <Box
      sx={{ mx: "auto", my: "2rem", textAlign: "center", maxWidth: "500px" }}
    >
      <Image src={image401} alt="401 authorozation image" height="350" />
      <Typography variant="h1" color="primary">
        No authorization found.
      </Typography>
      <Typography variant="body1" color="primary" sx={{ mb: 1 }}>
        This page is not publicly available.
      </Typography>
      <Typography variant="body1" color="primary" sx={{ mb: 1 }}>
        To access it please connect you wallet first.
      </Typography>
      <SmartLink href="/" isExternal={false}>
        <Button variant="contained">Return Home</Button>
      </SmartLink>
    </Box>
  );
};

export default Unauthorized;
