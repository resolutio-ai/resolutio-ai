import { Box } from "@mui/material";
import React from "react";
import DisputeResolutionForm from "../components/disputeResolution/DisputeResolutionForm";
import DisputeResolutionHeader from "../components/disputeResolution/DisputeResolutionHeader";
import Meta from "../components/seo/Meta";

const InitateDispute = () => {
  return (
    <>
      <Meta title="Dispute Resolution" />
      <Box>
        <DisputeResolutionHeader />
        <DisputeResolutionForm />
      </Box>
    </>
  );
};

export default InitateDispute;
