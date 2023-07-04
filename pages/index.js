//import ImageVerification from "../components/home/ImageVerification";
import InitiateDispute from "../components/home/InitiateDispute";
import OurTeam from "../components/home/OurTeam";
import ResEd from "../components/home/ResEd";
import Meta from "../components/seo/Meta";

const Home = () => {
  return (
    <div>
      <Meta
        title="resolutio"
        keywords="NFT theft, NFT search, NFT scam, NFT rights, NFT duplication, NFT disputes, Blockchain dispute resolution, Sneha Vijyan, NFT, resolutio, Zareen Reza, Res Ed, Res Educate, Bestin John, Anish Praveen, Ogubuike Alexandra Ozioma"
        description="A club/home for NFT Community(artists, collectors, developers) where the community collectively owns and operates the platform.Resolutio provides the environment for the Community to come together, engage, and uplift themselves, to help each other and protect each other from harm.Resolutio provides the resources and tools, and extends help to the Community so they can promote and protect each other. [resolutio protects, but by helping the community protect themselves]"
      />
      {/* <ImageVerification /> */}
      <InitiateDispute />
      <ResEd />
      <OurTeam />
    </div>
  );
};

export default Home;
