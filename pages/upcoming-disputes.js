import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import DisputesList from "../components/disputeResolution/DisputesList";
import NotArbiter from "../components/NotArbiter";
import RenderOnArbiter from "../components/RenderOnArbiter";
import Meta from "../components/seo/Meta";
import Unauthorized from "../components/Unauthorized";
import { CREATED } from "../constants/constants";
import { useResolutioBackdropContext } from "../context/ResolutioBackdropContext";
import { useResolutioContext } from "../context/ResolutioContext";
import DisputePool from "../integrations/DisputePool";
const UpcomingDisputes = () => {
  const { address } = useResolutioContext();
  const { openBackdrop, closeBackdrop } = useResolutioBackdropContext();
  const [upComingDisputes, setUpComingDisputes] = useState([]);
  const [arbiterDisputes, setArbiterDisputes] = useState(true);

  useEffect(() => {
    const asyncGetDisputes = async () => {
      if (!address) {
        return;
      }
      openBackdrop("Hold on, Fetching Arbiter information...");
      try {
        const disputeSystem = new DisputePool();
        const allDisputes = await disputeSystem.getAllDisputes();
        let mappedDisputes = allDisputes.map((dispute) => {
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
          .then(function (disputes) {
            mappedDisputes.forEach((dispute, index) => {
              dispute.additionalDetails = disputes[index];
              dispute.description = disputes[index]?.info;
            });
            console.log(mappedDisputes);
            const upcomingDisputesMapped = mappedDisputes.filter(
              () => (dispute) => dispute.state == CREATED
            );
            const arbiterDisputesMapped = mappedDisputes.filter((dispute) =>
              dispute.selectedArbiters.includes(address)
            );
            setUpComingDisputes(upcomingDisputesMapped);
            setArbiterDisputes(arbiterDisputesMapped);
            closeBackdrop();
          });
      } catch (error) {
        console.log(error);
      } finally {
        //closeBackdrop();
      }
    };
    asyncGetDisputes();
  }, [address, closeBackdrop, openBackdrop]);

  return (
    <>
      <Meta title="Upcoming Disputes" />
      <RenderOnArbiter>
        {upComingDisputes.length > 0 && (
          <Box>
            <Typography variant="h1">Upcoming Disputes</Typography>
            <DisputesList disputes={upComingDisputes} />
          </Box>
        )}
        {arbiterDisputes.length > 0 && (
          <Box>
            <Typography variant="h1">Arbiter Disputes</Typography>
            <DisputesList disputes={arbiterDisputes} />
          </Box>
        )}
      </RenderOnArbiter>
      <NotArbiter />
      <Unauthorized />
    </>
  );
};

export default UpcomingDisputes;
