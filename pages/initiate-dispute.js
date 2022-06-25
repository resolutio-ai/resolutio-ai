import { Box } from "@mui/material";
import DisputeResolutionForm from "../components/disputeResolution/DisputeResolutionForm";
import DisputeResolutionHeader from "../components/disputeResolution/DisputeResolutionHeader";
import RenderOnAnonymous from "../components/RenderOnAnonymous";
import RenderOnAuthenticated from "../components/RenderOnAuthenticated";
import Meta from "../components/seo/Meta";
import Unauthorized from "../components/Unauthorized";

const InitateDispute = () => {
  return (
    <>
      <Meta title="Dispute Resolution" />
      <RenderOnAuthenticated>
        <Box>
          <DisputeResolutionHeader />
          <DisputeResolutionForm />
        </Box>
      </RenderOnAuthenticated>
      <RenderOnAnonymous>
        <Unauthorized />
      </RenderOnAnonymous>
    </>
  );
};

export default InitateDispute;
