import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { PLACEHOLDER_BLUR } from "../constants/constants";
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
        {members.map(({ id, profileURL, imageSrc, name }) => {
          return (
            <Box
              sx={{ mr: 2, textDecoration: "none" }}
              key={id}
              component="a"
              href={profileURL}
              target="_blank"
            >
              <Image
                src={imageSrc}
                alt={name}
                width="150"
                height="150"
                objectFit="cover"
                className="rounded"
                placeholder="blur"
                blurDataURL={PLACEHOLDER_BLUR}
              />
              <Typography variant="h6" color="primary">
                {name}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default OurTeam;
