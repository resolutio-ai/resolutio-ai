/* import ImageVerification from "../components/home/ImageVerification"; */
/* import InitiateDispute from "../components/home/InitiateDispute"; */
import { Box, Button, Card, CardContent, Typography, CardActions } from "@mui/material";
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import OurTeam from "../components/home/OurTeam";
import ResEd from "../components/home/ResEd";
import Meta from "../components/seo/Meta";
import Image from "next/image";
import waitinglistImage from "../public/waitinglist.svg"

const Home = () => {
  return (
    <div>
      <Meta
        title="resolutio"
        keywords="NFT theft, NFT search, NFT scam, NFT rights, NFT duplication, NFT disputes, Blockchain dispute resolution, Sneha Vijyan, NFT, resolutio, Zareen Reza, Res Ed, Res Educate, Bestin John, Anish Praveen, Ogubuike Alexandra Ozioma"
        description="A club/home for NFT Community(artists, collectors, developers) where the community collectively owns and operates the platform.Resolutio provides the environment for the Community to come together, engage, and uplift themselves, to help each other and protect each other from harm.Resolutio provides the resources and tools, and extends help to the Community so they can promote and protect each other. [resolutio protects, but by helping the community protect themselves]"
      />
      {/* <ImageVerification /> */}
      {/* <InitiateDispute /> */}
      <Box sx={{ textAlign: "center", mt: 8 }}>
        <Card sx={{ px: 3, pb: 3 }}>
          <CardContent sx={{ mb: 2 }}>
            <Typography variant="h5" sx={{ mb: 4 }}>
              Empowering Creators Worldwide
            </Typography>
            <Image src={waitinglistImage} height="150" alt="Verification Image" />
          </CardContent>
          <CardActions sx={{ justifyContent: 'center' }}>
            <Button variant="contained" endIcon={<HourglassBottomIcon />}
              target="_blank"
              href="https://docs.google.com/forms/d/1_ZgLIGn_BZ6Ym8HM-aiTJbT0HlrTb1k0M2APRdNFPT0/edit">
              Join Waiting List
            </Button>
          </CardActions>
        </Card>
      </Box>
      <ResEd />
      <OurTeam />
    </div>
  );
};

export default Home;
