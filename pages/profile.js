import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import DisputesList from "../components/disputeResolution/DisputesList";
import RenderOnArbiter from "../components/RenderOnArbiter";
import RenderOnAuthenticated from "../components/RenderOnAuthenticated";
import Meta from "../components/seo/Meta";
import Unauthorized from "../components/Unauthorized";
import { useResolutioContext } from "../context/ResolutioContext";
import DisputePool from "../integrations/DisputePool";

const Profile = () => {
  const { address } = useResolutioContext();
  const [createdDisputes, setCreatedDisputes] = useState([]);

  useEffect(() => {
    const asyncGetDisputes = async () => {
      if (!address) {
        return;
      }
      try {
        const disputeSystem = new DisputePool();
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
        Promise.all(
          mappedDisputes.map((dispute) => fetch(`${dispute.uri}/dispute.json`))
        )
          .then(function (responses) {
            // Get a JSON object from each of the responses
            return Promise.all(
              responses.map(function (response) {
                if (response.status === 200) return response.json();
                return null;
              })
            );
          })
          .then(function (allDisputeDetails) {
            mappedDisputes.forEach((dispute, index) => {
              dispute.additionalDetails = allDisputeDetails[index];
              dispute.description = allDisputeDetails[index]?.info;
            });
            console.log(mappedDisputes);
          });
        setCreatedDisputes(mappedDisputes);
      } catch (error) {
        console.log(error);
      }
    };
    asyncGetDisputes();
  }, [address]);

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
      </RenderOnAuthenticated>
      <RenderOnArbiter>
        <Box>
          {/* <Typography variant="h1">Ongoing Disputes</Typography> */}
        </Box>
      </RenderOnArbiter>
      {createdDisputes.length > 0 && (
        <Box>
          <Typography variant="h1">Created Disputes</Typography>
          <DisputesList disputes={createdDisputes} />
        </Box>
      )}

      <Unauthorized />
    </>
  );
};

export default Profile;
