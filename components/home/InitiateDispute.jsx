import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import RenderOnAuthenticated from "../RenderOnAuthenticated";

const InitiateDispute = () => {
  return (
    <RenderOnAuthenticated>
      <Box sx={{ textAlign: "center", mt: 12 }}>
        <Typography variant="h5">Initiate Dispute</Typography>
        <Typography variant="body1">
          Raise a dispute about unauthorised use of your art here.
        </Typography>
        <Link href="/initiate-dispute" passHref>
          <Button variant="outlined" sx={{ mt: "1rem" }}>
            Initiate Dispute
          </Button>
        </Link>
        <br></br>
        <br></br>
        <Typography variant="h5">Become an Arbiter</Typography>
        <Typography variant="body1">
          Adjudicate disputes, restore justice, and earn rewards!
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
