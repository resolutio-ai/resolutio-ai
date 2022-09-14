import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import SmartLink from "../components/SmartLink";
import { BACK_HOME_BTN_TXT } from "../constants/strings";
import image404 from "../public/404.svg";

const FourOhFour = () => {
  return (
    <Box sx={{ mx: "auto", my: "2rem", textAlign: "center" }}>
      <Image src={image404} alt="404 Page not found" height="350" />
      <Typography variant="h5" color="primary" sx={{ my: 2 }}>
        {"We're sorry :(, but the page your are looking for does not exit!"}
      </Typography>
      <SmartLink href="/" isExternal={false}>
        <Button variant="contained">{BACK_HOME_BTN_TXT}</Button>
      </SmartLink>
    </Box>
  );
};

export default FourOhFour;
