import { Box, Button, Grid, Typography } from "@mui/material";
import RenderOnAnonymous from "../../components/RenderOnAnonymous";
import RenderOnAuthenticated from "../../components/RenderOnAuthenticated";
import Meta from "../../components/seo/Meta";
import SmartLink from "../../components/SmartLink";
import Unauthorized from "../../components/Unauthorized";
const DisputeDetails = () => {
  return (
    <>
      <Meta title="Dispute Details" />
      <RenderOnAuthenticated>
        <Box sx={{ textAlign: "center", mb: 10 }}>
          <Typography variant="h1">DA01</Typography>
          <Grid container spacing={2}>
            <Grid item md={4} sm={6} xs={12}>
              <Button variant="contained" color="secondary">
                Facts
              </Button>
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <Button variant="contained" color="secondary">
                Evidence
              </Button>
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <SmartLink
                href="https://znreza-blockchain-transaction-search-app-4pp5e7.streamlitapp.com/"
                isExternal={true}
              >
                <Button variant="contained" color="secondary">
                  Arbiter Tools
                </Button>
              </SmartLink>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h1">VOTE</Typography>
          <Box>
            <Button variant="contained" color="secondary" sx={{ mr: 4 }}>
              Invalidate NFT
            </Button>
            <Button variant="contained" color="primary">
              Validate NFT
            </Button>
          </Box>
        </Box>
      </RenderOnAuthenticated>
      <RenderOnAnonymous>
        <Unauthorized />
      </RenderOnAnonymous>
    </>
  );
};

export default DisputeDetails;
