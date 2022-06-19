import { Box, Typography } from "@mui/material";
import DisputesList from "../components/disputeResolution/DisputesList";
import Meta from "../components/seo/Meta";
const RaisedDisputes = () => {
  const upComingDisputes = [
    {
      id: "1",
      title: "Digital Art",
      description: "Comic created by artist tokenized ...",
      stakeTime: 1655636071,
      isStakeTimeExpired: false,
    },
    {
      id: "2",
      title: "Music",
      description: "Part of the victim's song used ...",
      stakeTime: 1655722471,
      isStakeTimeExpired: false,
    },
    {
      id: "3",
      title: "Movie",
      description: "Copy of the victims short film NFT ...",
      stakeTime: 1655808871,
      isStakeTimeExpired: false,
    },
  ];
  const onGoingDisputes = [
    {
      id: "1",
      title: "DA 01",
      description: "Comic created by artist tokenized ...",
      stakeTime: 1655463271,
      isStakeTimeExpired: true,
    },
    {
      id: "2",
      title: "DA 06",
      description: "Part of the victim's song used ...",
      stakeTime: 1655549671,
      isStakeTimeExpired: true,
    },
  ];
  return (
    <>
      <Meta title="Raised Disputes" />
      <Box>
        <Typography variant="h1">Ongoing Disputes</Typography>
        <DisputesList disputes={onGoingDisputes} />
      </Box>
      <Box>
        <Typography variant="h1">Upcoming Disputes</Typography>
        <DisputesList disputes={upComingDisputes} />
      </Box>
    </>
  );
};

export default RaisedDisputes;
