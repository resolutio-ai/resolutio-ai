import OurTeam from "../components/OurTeam";
import ResEd from "../components/ResEd";
import Meta from "../components/seo/Meta";
import Welcome from "../components/Welcome";

const Home = () => {
  return (
    <div>
      <Meta
        title="resolutio"
        keywords="NFT theft, NFT search, NFT scam, NFT rights, NFT duplication, NFT disputes, Blockchain dispute resolution, Sneha Vijyan, NFT, resolutio, Zareen Reza, Res Ed, Res Educate"
      />
      <Welcome />
      <ResEd />
      <OurTeam />
    </div>
  );
};

export default Home;
