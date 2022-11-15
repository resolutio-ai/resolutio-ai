import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import DisputesList from "../components/disputeResolution/DisputesList";
import RenderOnAuthenticated from "../components/RenderOnAuthenticated";
import Meta from "../components/seo/Meta";
import Unauthorized from "../components/Unauthorized";
import { useResolutioBackdropContext } from "../context/ResolutioBackdropContext";
import { useResolutioContext } from "../context/ResolutioContext";
import DisputePool from "../integrations/DisputePool";

const Profile = () => {
  const { address } = useResolutioContext();
  const { openBackdrop, closeBackdrop } = useResolutioBackdropContext();
  const [createdDisputes, setCreatedDisputes] = useState([]);

  useEffect(() => {
    const asyncGetMyDisputes = async () => {
      if (!address) {
        return;
      }
      openBackdrop("Hold on, Fetching your profile data...");
      try {
        const disputeSystem = new DisputePool();

        // Get the user disputes from the Blockchain
        const disputes = await disputeSystem.getMyCreatedDisputes(address);
        let mappedDisputes = disputes.map((dispute) => {
          const {
            arbiterCount,
            createdAt,
            creator,
            disputeId,
            disputePool,
            selectedArbiters,
            state,
            uri,
            winningProposal,
          } = dispute;
          return {
            hasStaked: disputePool.includes(address),
            arbiterCount,
            createdAt,
            creator,
            disputeId,
            disputePool,
            selectedArbiters,
            state,
            uri,
            winningProposal,
          };
        });

        // Get other details of the dispute from IPFS
        const allDisputeDetails = await Promise.all(
          mappedDisputes.map(
            async (dispute) =>
              await (await fetch(`${dispute.uri}/dispute.json`)).json()
          )
        );

        // Merge the dispute details with the dispute object
        mappedDisputes.forEach((dispute, index) => {
          dispute.additionalDetails = allDisputeDetails[index];
          dispute.description = allDisputeDetails[index]?.info;
        });
        setCreatedDisputes(mappedDisputes);

        // TODO: Remove console.log after testing
        console.log(mappedDisputes);
      } catch (error) {
        console.log(error);
        // TODO: Handle neagtive cases in the future
      } finally {
        closeBackdrop();
      }
    };
    // Loading the user's disputes
    asyncGetMyDisputes();
  }, [address, closeBackdrop, openBackdrop]);

  return (
    <>
      <Meta title="Profile" />
      <RenderOnAuthenticated>
        <Box sx={{ mb: 5 }}>
          <Typography variant="h1">Profile</Typography>
          <Typography variant="h6" sx={{ display: "inline", mr: 2 }}>
            Account Address:
          </Typography>
          <code>{address}</code>
        </Box>

        {createdDisputes.length > 0 && (
          <Box>
            <Typography variant="h1">Created Disputes</Typography>
            <DisputesList disputes={createdDisputes} />
          </Box>
        )}
      </RenderOnAuthenticated>
      <Unauthorized />
    </>
  );
};

export default Profile;
