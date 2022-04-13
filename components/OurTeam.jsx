import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

const OurTeam = () => {
  const members = [
    {
      id: 1,
      imageSrc: "/sneha.jpg",
      name: "Sneha Vijayan",
      profileURL: "https://www.linkedin.com/in/sneha-vijayan-0a8608169/",
    },
    {
      id: 2,
      imageSrc: "/zarreen.jpg",
      name: "Zarreen Reza",
      profileURL: "https://www.linkedin.com/in/zarreennreza/",
    },
  ];
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
                width={200}
                height={200}
                objectFit="cover"
                className="rounded"
              />
              <Typography variant="h6">{member.name}</Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default OurTeam;
