import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import members from "../data/ourMembers.json";

const OurTeam = () => {
  return (
    <Box sx={{ textAlign: "center", my: 12 }}>
      <Typography variant="h5">Meet Our Team</Typography>
      <Box
        sx={{
          mt: 2,
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {members.map((member) => {
          return (
            <Box
              sx={{ mr: 2, textDecoration: "none" }}
              key={member.id}
              component="a"
              href={member.profileURL}
              target="_blank"
            >
              <Image
                src={member.imageSrc}
                alt={member.name}
                width="150"
                height="150"
                objectFit="cover"
                className="rounded"
              />
              <Typography variant="h6" color="primary">{member.name}</Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default OurTeam;
