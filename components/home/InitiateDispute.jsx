import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import RenderOnAuthenticated from "../RenderOnAuthenticated";

const InitiateDispute = () => {
  return (
    <RenderOnAuthenticated>
      <Box sx={{ textAlign: "center", mt: 12 }}>
        <Typography variant="h5">Create NFT Dispute</Typography>
        <Typography variant="body1">
          Initiate Dispute Resolution against an NFT. Provide the NFT Id and the
          corresponding marketplace namd against which you want to initite the
          claim.
        </Typography>
        <Link href="/initiate-dispute" passHref>
          <Button variant="outlined" sx={{ mt: "1rem" }}>
            Initiate Dispute
          </Button>
        </Link>
        <br></br>
        <br></br>
        <Typography variant="h5">Apply to become an arbiter</Typography>
        <Typography variant="body1">
          Adjudicate disputes, Restore justice, and Earn rewards!
        </Typography>
        <Link href="/arbiter-details" passHref>
          <Button variant="outlined" sx={{ mt: "1rem" }}>
            Become Arbitar
          </Button>
        </Link>
      </Box>
    </RenderOnAuthenticated>
  );
};

export default InitiateDispute;
