import {
  Blogs,
  CommunityLink,
  EventsAndWorkShop,
  EvidenceLink,
  LavenderCollectiveLink,
  OurStory,
  OurTeam,
  ResolveDispute,
  UnderstandYourRights
} from '@/app/components';

const HomePage = () => {
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

export default HomePage;
