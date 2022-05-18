import Head from "next/head";
import OurTeam from "../components/OurTeam";
import ResEd from "../components/ResEd";
import Welcome from "../components/Welcome";

const Home = () => {
  return (
    <div>
      <Head>
        <title>resolutio</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.jpeg" />
      </Head>
      <Welcome />
      <ResEd />
      <OurTeam />
    </div>
  );
};

export default Home;
