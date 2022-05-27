import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import BetaBanner from "../components/BetaBanner";
import OurTeam from "../components/OurTeam";
import ResEd from "../components/ResEd";
import Meta from "../components/seo/Meta";
import { IMAGE_VERIFICATION_HEADING } from "../constants/strings";

const Home = () => {
  return (
    <div>
      <Meta
        title="resolutio"
        keywords="NFT theft, NFT search, NFT scam, NFT rights, NFT duplication, NFT disputes, Blockchain dispute resolution, Sneha Vijyan, NFT, resolutio, Zareen Reza, Res Ed, Res Educate"
      />
      {/* <Welcome /> */}
      <>
        <Box sx={{
          textAlign: "center", my: "2rem",
          border: "solid 2px #7c63a0",
          padding: "25px",
          borderRadius: "15px",
          boxShadow: "4px 5px #ccc"
        }}>
          <Typography variant="h5">
            {IMAGE_VERIFICATION_HEADING}
            <BetaBanner />
          </Typography>
          {/* <Typography variant="body1">{IMAGE_VERIFICATION_DESC}</Typography> */}
          <Typography variant="body1">
            Verify whether your art has been tokenized or your NFT duplicated
            without consent on <b>Ethereum</b>, <b>Polygon</b> or <b>Tezos</b>.
          </Typography>
          <Link href="/image-verification" passHref>
            <Button variant="outlined" sx={{ mt: "1rem" }}>
              VERIFY NOW
            </Button>
          </Link>
        </Box>
      </>
      <ResEd />
      <OurTeam />
    </div>
  );
};

export default Home;
