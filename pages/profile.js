import { Box, Typography } from "@mui/material";
import RenderOnArbiter from "../components/RenderOnArbiter";
import RenderOnAuthenticated from "../components/RenderOnAuthenticated";
import Meta from "../components/seo/Meta";
import Unauthorized from "../components/Unauthorized";
import { useResolutioContext } from "../context/ResolutioContext";

const Profile = () => {
  const { address } = useResolutioContext();
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
      <Meta title="Profile" />
      <RenderOnAuthenticated>
        <Box sx={{ mb: 5 }}>
          <Typography variant="h1">Profile</Typography>
          <Typography variant="h6" sx={{ display: "inline", mr: 2 }}>
            Account Address:
          </Typography>
          <code>{address}</code>
        </Box>
      </RenderOnAuthenticated>
      <RenderOnArbiter>
        <Box>
          <Typography variant="h1">Ongoing Disputes</Typography>
          {/* <DisputesList disputes={onGoingDisputes} /> */}
        </Box>
      </RenderOnArbiter>
      <Unauthorized />
    </>
  );
};

export default Profile;
