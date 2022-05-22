import { Box, Grid } from "@mui/material";
import React from "react";
import Meta from "../components/seo/Meta";
import UserCard from "../components/UserCard";
import { RESED_HEADING } from "../constants/strings";
import users from "../data/cohortUsers.json";

const ResEdPage = () => {
  return (
    <>
      <Meta title="Res Ed" />
      <Box sx={{ textAlign: "center", my: 5 }}>
        <h2>{RESED_HEADING}</h2>
        <p>
          Last year, over $44 billion worth of cryptocurrency was spent on NFTs.
          Despite the popularity of NFTs, artists, collectors and other
          stakeholders continue to get confused about rights pertaining to NFTs.
          Moreover, active groups which discuss NFT rights remain unknown to
          persons in the NFT Community. To promote conversations and spread
          awareness on NFT rights, and bridge the gap between stakeholders who
          seek knowledge and NFT rights experts, we are hosting resolutio’s
          first res educate cohort programme.
        </p>
        <h3>Res Ed Cohort 2022</h3>
        <Grid container spacing={3}>
          {users.map((user) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={user.id}
              sx={{ display: "flex" }}
            >
              <UserCard user={user} key={user.id} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default ResEdPage;
