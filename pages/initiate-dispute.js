import { Box } from "@mui/material";
import DisputeResolutionForm from "../components/disputeResolution/DisputeResolutionForm";
import DisputeResolutionHeader from "../components/disputeResolution/DisputeResolutionHeader";
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
      <Unauthorized />
    </>
  );
};

export default InitateDispute;
