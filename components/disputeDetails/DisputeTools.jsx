import { Box, Button } from "@mui/material";
import RenderOnArbiter from "../RenderOnArbiter";
import SmartLink from "../SmartLink";

const DisputeTools = ({ uri }) => {
  return (
    <Box sx={{ mt: 2 }}>
      <SmartLink href={uri} isExternal={true}>
        <Button variant="contained" color="secondary" sx={{ mr: 2 }}>
          Evidence
        </Button>
      </SmartLink>
      <RenderOnArbiter>
        <SmartLink
          href="https://znreza-blockchain-transaction-search-app-4pp5e7.streamlitapp.com/"
          isExternal={true}
        >
          <Button variant="contained" color="secondary">
            Arbiter Tools
          </Button>
        </SmartLink>
      </RenderOnArbiter>
    </Box>
  );
};

export default DisputeTools;
