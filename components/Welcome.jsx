import BalanceIcon from "@mui/icons-material/Balance";
import ForumIcon from "@mui/icons-material/Forum";
import SchoolIcon from "@mui/icons-material/School";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

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
      <h2>Welcome</h2>
      <p>
        We are a community of artists, NFT collectors, developers, lawyers and
        other NFT enthusiasts, working together to tackle art theft and
        demystify NFT rights.
      </p>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Link href="/res-ed" passHref>
            <Box>
              <IconButton color="primary">
                <SchoolIcon sx={styles.iconStyles} />
              </IconButton>
              <Typography sx={styles.iconText} color="primary">
                Res Ed
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
                Dispute Resolution
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
                Join our community
              </Typography>
            </Box>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Welcome;
