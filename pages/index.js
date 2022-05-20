import OurTeam from "../components/OurTeam";
import ResEd from "../components/ResEd";
import Meta from "../components/seo/Meta";
import Welcome from "../components/Welcome";

const Home = () => {
  return (
    <div>
      <Meta title="resolutio" />
      <Welcome />
      <ResEd />
      <OurTeam />
    </div>
  );
};

export default Home;
