import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import { useMemo } from "react";
import {
  BACK_HOME_BTN_TXT,
  NOT_ARBITER_BODY_TEXT_1,
  NOT_ARBITER_HEADING,
} from "../constants/strings";
import { useResolutioContext } from "../context/ResolutioContext";
import image401 from "../public/401.svg";
import SmartLink from "./SmartLink";

const NotArbiter = () => {
  const { isArbiter, isLoggedIn } = useResolutioContext();
  const showContent = useMemo(
    () => isLoggedIn && !isArbiter,
    [isArbiter, isLoggedIn]
  );
  return (
    <>
      {showContent && (
        <Box
          sx={{
            mx: "auto",
            my: "2rem",
            textAlign: "center",
            maxWidth: "500px",
          }}
        >
          <Image src={image401} alt="401 authorozation image" height="350" />
          <Typography variant="h1" color="primary">
            {NOT_ARBITER_HEADING}
          </Typography>
          <Typography variant="body1" color="primary" sx={{ mb: 1 }}>
            {NOT_ARBITER_BODY_TEXT_1}
          </Typography>
          <SmartLink href="/" isExternal={false}>
            <Button variant="contained">{BACK_HOME_BTN_TXT}</Button>
          </SmartLink>
        </Box>
      )}
    </>
  );
};

export default NotArbiter;
