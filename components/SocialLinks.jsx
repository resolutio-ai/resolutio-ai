import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Box, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import React from "react";
import Discord from "../public/social/discord.svg";

const useStyles = (theme) => ({
  textLine: {
    color: theme.palette.primary.contrastText,
  },
  iconStyle: {
    color: theme.palette.primary.contrastText,
  },
});

const SocialLinks = () => {
  const theme = useTheme();
  const styles = useStyles(theme);
  return (
    <Box sx={{ pt: 3, textAlign: "center", mb: 6 }}>
      <Typography variant="h6" sx={styles.textLine}>
        Join Our Community
      </Typography>
      <Box sx={{ p: 2 }}>
        <Box component="span" sx={{ mx: 2 }}>
          <TwitterIcon sx={styles.iconStyle} fontSize="large" />
        </Box>
        <Box component="span" sx={{ mx: 2 }}>
          <Image src={Discord} alt="discord" height="35" />
        </Box>
        <Box component="span" sx={{ mx: 2 }}>
          <LinkedInIcon sx={styles.iconStyle} fontSize="large" />
        </Box>
        <Box component="span" sx={{ mx: 2 }}>
          <EmailIcon sx={styles.iconStyle} fontSize="large" />
        </Box>
      </Box>
    </Box>
  );
};

export default SocialLinks;
