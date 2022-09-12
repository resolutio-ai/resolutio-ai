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
        keywords="NFT theft, NFT search, NFT scam, NFT rights, NFT duplication, NFT disputes, Blockchain dispute resolution, Sneha Vijyan, NFT, resolutio, Zareen Reza, Res Ed, Res Educate, Bestin John, Anish Praveen, Ogubuike Alexandra Ozioma"
        description="A club/home for NFT Community(artists, collectors, developers) where the community collectively owns and operates the platform.Resolutio provides the environment for the Community to come together, engage, and uplift themselves, to help each other and protect each other from harm.Resolutio provides the resources and tools, and extends help to the Community so they can promote and protect each other. [resolutio protects, but by helping the community protect themselves]"
      />
      <>
        <Box
          sx={{
            textAlign: "center",
            my: "2rem",
            border: "solid 2px #7c63a0",
            padding: "25px",
            borderRadius: "15px",
            boxShadow: "4px 5px #ccc",
          }}
        >
          <Typography variant="h5">
            {IMAGE_VERIFICATION_HEADING}
            <BetaBanner />
          </Typography>
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
