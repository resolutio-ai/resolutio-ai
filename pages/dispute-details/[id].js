import { Box, Button, Grid, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import CountDownTimer from "../../components/CountDownTimer";
import RenderOnAnonymous from "../../components/RenderOnAnonymous";
import RenderOnAuthenticated from "../../components/RenderOnAuthenticated";
import Meta from "../../components/seo/Meta";
import SmartLink from "../../components/SmartLink";
import Unauthorized from "../../components/Unauthorized";
const DisputeDetails = () => {
  const [show, setShow] = useState(false);
  const showFacts = useCallback(() => {
    setShow(true);
  }, [setShow]);
  return (
    <>
      <Meta title="Dispute Details" />
      <RenderOnAuthenticated>
        <Box sx={{ textAlign: "center", mb: 10 }}>
          <Typography variant="h1">DA01</Typography>
          <Grid container spacing={2}>
            <Grid item md={4} sm={6} xs={12}>
              <Button variant="contained" color="secondary" onClick={showFacts}>
                Facts
              </Button>
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <SmartLink
                href="https://ipfs.io/ipfs/bafybeic65bxwnyug6mke5sc46rylsvhncorjzyrbg6y5az4x2cftbbeogu"
                isExternal={true}
              >
                <Button variant="contained" color="secondary">
                  Evidence
                </Button>
              </SmartLink>
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
          <Box sx={{ mt: 10, textAlign: "center" }}>
            {show && (
              <Typography variant="h4">
                Victim’s comic, which was first published on their social media
                page in 2020, was allegedly minted as an NFT by another on 13
                Feb 2022.
              </Typography>
            )}
          </Box>
        </Box>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h1">VOTE</Typography>
          <CountDownTimer expiryTimestamp={1656530040208} />
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
