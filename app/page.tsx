import {
  Blogs,
  CommunityLink,
  EventsAndWorkShop,
  EvidenceLink,
  LavenderCollectiveLink,
  OurStory,
  OurTeam,
  ResolveDispute,
  UnderstandYourRights,
} from './components';

const Home = () => {
  return (
    <>
      <OurStory />
      <EvidenceLink />
      <ResolveDispute />
      <CommunityLink />
      <UnderstandYourRights />
      <EventsAndWorkShop />
      <LavenderCollectiveLink />
      <Blogs />
      <OurTeam />
    </>
  );
};

export default Home;
