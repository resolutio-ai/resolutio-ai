import { Box } from "@mui/material";
import DetailsResolutionForm from "../components/getArbiterDetails/ArbiterDetailsResolutionForm";
import DetailsResolutionHeader from "../components/getArbiterDetails/ArbiterDetailsResolutionHeader";
import Meta from "../components/seo/Meta";
import Unauthorized from "../components/Unauthorized";

const ArbiterDetails = () => {
  return (
    <>
      <Meta title="Dispute Resolution" />
      {/* <RenderOnAuthenticated> */}
        <Box>
          <DetailsResolutionHeader />
          <DetailsResolutionForm />
        </Box>
      {/* </RenderOnAuthenticated> */}
      <Unauthorized />
    </>
  );
};

export default ArbiterDetails;
