import BalanceIcon from "@mui/icons-material/Balance";
import ForumIcon from "@mui/icons-material/Forum";
import SchoolIcon from "@mui/icons-material/School";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import {
  DISCORD_TEXT,
  DISPUTE_TEXT,
  RESED_TEXT,
  WELCOME_DESC,
  WELCOME_HEADING,
} from "../constants/strings";

const useStyles = () => ({
  iconStyles: {
    textDecoration: "none",
    fontSize: {
      xs: "5rem",
      sm: "7rem",
      lg: "10rem",
    },
  },
  iconText: {
    cursor: "pointer",
    fontWeight: "bold",
  },
});

const Welcome = () => {
  const styles = useStyles();

  return (
    <Box sx={{ textAlign: "center" }}>
      <h2>{WELCOME_HEADING}</h2>
      <p>{WELCOME_DESC}</p>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Link href="/res-ed" passHref>
            <Box>
              <IconButton color="primary">
                <SchoolIcon sx={styles.iconStyles} />
              </IconButton>
              <Typography sx={styles.iconText} color="primary">
                {RESED_TEXT}
              </Typography>
            </Box>
          </Link>
        </Grid>
        <Grid item xs={4}>
          <Link href="/initiate-dispute" passHref>
            <Box>
              <IconButton color="primary">
                <BalanceIcon sx={styles.iconStyles} />
              </IconButton>
              <Typography sx={styles.iconText} color="primary">
                {DISPUTE_TEXT}
              </Typography>
            </Box>
          </Link>
        </Grid>
        <Grid item xs={4}>
          <Link href="https://discord.com/invite/RdN9zWQ4AA" passHref>
            <Box>
              <IconButton color="primary">
                <ForumIcon sx={styles.iconStyles} />
              </IconButton>
              <Typography sx={styles.iconText} color="primary">
                {DISCORD_TEXT}
              </Typography>
            </Box>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Welcome;
