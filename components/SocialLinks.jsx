import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Box, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import React from "react";
import Discord from "../public/social/discord.svg";

const useStyles = (palette) => ({
  textLine: {
    display: "flex",
    alignItems: "center",
    color: palette.primary.contrastText,
    "&::before": {
      content: '""',
      flex: "1 1",
      borderBottom: "solid 1px #e5e8eb40",
      marginRight: "10px",
    },
    "&::after": {
      content: '""',
      flex: "1 1",
      borderBottom: "solid 1px #e5e8eb40",
      marginLeft: "10px",
    },
  },
  iconStyle: {
    color: "white",
  },
});

const SocialLinks = () => {
  const theme = useTheme();
  const { palette } = theme;
  const styles = useStyles(palette);
  return (
    <Box sx={{ py: 3 }}>
      <Typography variant="h6" sx={styles.textLine}>
        Join Our Community
      </Typography>
      <Box sx={{ p: 2, textAlign: "center" }}>
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
