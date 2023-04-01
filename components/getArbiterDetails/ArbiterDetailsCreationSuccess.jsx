import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import imageSuccess from "../../public/success.svg";
import SmartLink from "../SmartLink";

const DetailsCreationSuccess = () => {
  return (
    <>
      <Box
        sx={{ mx: "auto", my: "2rem", textAlign: "center", maxWidth: "500px" }}
      >
        <Image src={imageSuccess} alt="401 authorozation image" height="350" />
        <Typography variant="h5" color="primary" sx={{ my: 2 }}>
          Your Details has been successfully created!
        </Typography>
        <SmartLink href="/profile" isExternal={false}>
          <Button variant="contained">View all Detailss</Button>
        </SmartLink>
      </Box>
    </>
  );
};

export default DetailsCreationSuccess;
