import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import RenderOnAnonymous from "../components/RenderOnAnonymous";
import {
  BACK_HOME_BTN_TXT,
  UNAUTH_BODY_TEXT_1,
  UNAUTH_BODY_TEXT_2,
  UNAUTH_HEADING,
} from "../constants/strings";
import image401 from "../public/401.svg";
import SmartLink from "./SmartLink";

const Unauthorized = () => {
  return (
    <RenderOnAnonymous>
      <Box
        sx={{ mx: "auto", my: "2rem", textAlign: "center", maxWidth: "500px" }}
      >
        <Image src={image401} alt="401 authorozation image" height="350" />
        <Typography variant="h1" color="primary">
          {UNAUTH_HEADING}
        </Typography>
        <Typography variant="body1" color="primary" sx={{ mb: 1 }}>
          {UNAUTH_BODY_TEXT_1}
        </Typography>
        <Typography variant="body1" color="primary" sx={{ mb: 1 }}>
          {UNAUTH_BODY_TEXT_2}
        </Typography>
        <SmartLink href="/" isExternal={false}>
          <Button variant="contained">{BACK_HOME_BTN_TXT}</Button>
        </SmartLink>
      </Box>
    </RenderOnAnonymous>
  );
};

export default Unauthorized;
