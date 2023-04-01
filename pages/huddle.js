import { Box } from "@mui/material";
import DetailsResolutionForm from "../components/getArbiterDetails/ArbiterDetailsResolutionForm";
import DetailsResolutionHeader from "../components/getArbiterDetails/ArbiterDetailsResolutionHeader";
import Meta from "../components/seo/Meta";
import Unauthorized from "../components/Unauthorized";
import { HuddleIframe } from "@huddle01/huddle01-iframe";

const HuddleView = () => {
  const iframeConfig = {
    roomUrl: "https://iframe.huddle01.com/123",
    height: "600px",
    width: "80%",
    noBorder: false, // false by default
  };

  return (
    <>
      <Meta title="Huddle" />
      {/* <RenderOnAuthenticated> */}
      <Box>
        <HuddleIframe config={iframeConfig} />
      </Box>
      {/* </RenderOnAuthenticated> */}
      <Unauthorized />
    </>
  );
};

export default HuddleView;
