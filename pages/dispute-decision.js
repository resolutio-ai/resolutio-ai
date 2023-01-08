import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import DisputesList from "../components/disputeResolution/DisputesList";
import NotArbiter from "../components/NotArbiter";
import RenderOnArbiter from "../components/RenderOnArbiter";
import Meta from "../components/seo/Meta";
import Unauthorized from "../components/Unauthorized";
import { useResolutioBackdropContext } from "../context/ResolutioBackdropContext";
import { useResolutioContext } from "../context/ResolutioContext";
import DisputePool from "../integrations/DisputePool";

const DisputeDecision = () => {
  const { address } = useResolutioContext();
  const { openBackdrop, closeBackdrop } = useResolutioBackdropContext();
  const [upComingDisputes, setUpComingDisputes] = useState([]);
  const [arbiterDisputes, setArbiterDisputes] = useState(true);

  useEffect(() => {
    const asyncGetDisputes = async () => {
      if (!address) {
        return;
      }
      openBackdrop("Hold on, Fetching Admin Arbiter information...");
      try {
        const disputeSystem = new DisputePool();

        // Get all Disputes from the Blockchain
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
            selectedArbiters: selectedArbiters.map(
              (arbiter) => arbiter.arbiter
            ),
            state,
            uri,
            winningProposal,
          };
        });

        // Get Aditional Details for the dispute from IPFS
        const allDisputeDetails = await Promise.all(
          mappedDisputes.map(
            async (dispute) =>
              await (await fetch(`${dispute.uri}/dispute.json`)).json()
          )
        );

        // Mapping the additional details to the dispute
        mappedDisputes.forEach((dispute, index) => {
          dispute.additionalDetails = allDisputeDetails[index];
          dispute.description = allDisputeDetails[index]?.info;
        });

        // TODO: Remove this after testing
        console.log(
          mappedDisputes
        );

        // Filter the disputes based on state(CREATED === Upcoming)
        const upcomingDisputesMapped = mappedDisputes

        // Filter the disputes based on arbiter is selected for decision making
        const arbiterDisputesMapped = mappedDisputes.filter((dispute) =>
          dispute.selectedArbiters.includes(address)
        );
        setUpComingDisputes(upcomingDisputesMapped);
        setArbiterDisputes(arbiterDisputesMapped);
      } catch (error) {
        console.log(error);
        // TODO: Hndle error for neagtive cases
      } finally {
        closeBackdrop();
      }
    };
    asyncGetDisputes();
  }, [address, closeBackdrop, openBackdrop]);

  return (
    <>
      <Meta title="Admin: Dispute Decisions" />
      <RenderOnArbiter>
        {upComingDisputes.length > 0 && (
          <Box>
            <Typography variant="h1">Admin: Dispute Decisions</Typography>
            <DisputesList disputes={upComingDisputes} />
          </Box>
        )}
        {arbiterDisputes.length > 0 && (
          <Box>
            <Typography variant="h1">Admin: Dispute Decisions</Typography>
            <DisputesList disputes={arbiterDisputes} />
          </Box>
        )}
      </RenderOnArbiter>
      <NotArbiter />
      <Unauthorized />
    </>
  );
};

export default DisputeDecision;
