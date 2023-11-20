import Script from 'next/script';
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
import { GA_TRACKING_ID } from './settings';

const Home = () => {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script id='google-analytics'>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', '${GA_TRACKING_ID}');
        `}
      </Script>
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
