import {
  Blogs,
  CommunityLink,
  EvidenceLink,
  LavenderCollectiveLink,
  OurStory,
  OurTeam,
} from './components';

const Home = () => {
  return (
    <>
      <OurStory />
      <EvidenceLink />
      <CommunityLink />
      <LavenderCollectiveLink />
      <Blogs />
      <OurTeam />
    </>
  );
};

export default Home;
