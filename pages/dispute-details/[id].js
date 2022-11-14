import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";

import Staking from "../../components/disputeDetails/Staking";
import Voting from "../../components/disputeDetails/Voting";
import NotArbiter from "../../components/NotArbiter";
import RenderOnArbiter from "../../components/RenderOnArbiter";
import Meta from "../../components/seo/Meta";
import SmartLink from "../../components/SmartLink";
import Unauthorized from "../../components/Unauthorized";
import { CAN_VOTE, CREATED } from "../../constants/constants";
import { useResolutioBackdropContext } from "../../context/ResolutioBackdropContext";
import { useResolutioContext } from "../../context/ResolutioContext";
import DisputePool from "../../integrations/DisputePool";

const DisputeDetails = () => {
  const router = useRouter();
  const { address, isArbiter } = useResolutioContext();
  const { openBackdrop, closeBackdrop } = useResolutioBackdropContext();
  const { id } = router.query;
  const [dispute, setDispute] = useState({
    title: "",
    description: "",
    hasStaked: false,
    arbiterCount: 0,
    createdAt: "",
    creator: "",
    disputeId: "",
    disputePool: [],
    selectedArbiters: [],
    state: 0,
    uri: "",
    winningProposal: 0,
    additionalDetails: null,
  });

  const [isVoted, setVoted] = useState(false);

  const isPageViewable = useMemo(
    () => isArbiter || dispute.creator === address,
    [address, dispute, isArbiter]
  );

  const handleJoinDisputePool = useCallback(() => {
    const asyncJoinDisputePool = async () => {
      if (!id) return;
      openBackdrop("Hold on, Joining Dispute Pool...");
      try {
        const disputeSystem = new DisputePool();
        await disputeSystem.joinDisputePool(id);
        setDispute((prev) => ({ ...prev, hasStaked: true }));
      } catch (error) {
        console.log(error);
      } finally {
        closeBackdrop();
      }
    };
    asyncJoinDisputePool();
  }, [closeBackdrop, id, openBackdrop]);

  const handleVoting = useCallback(
    (vote) => {
      const votingAsync = async () => {
        if (!id) return;
        openBackdrop("Hold on, Voting...");
        try {
          const disputeSystem = new DisputePool();
          await disputeSystem.vote(vote, id);
          setVoted(true);
        } catch (error) {
          console.log(error);
        } finally {
          closeBackdrop();
        }
      };
      votingAsync();
    },
    [closeBackdrop, id, openBackdrop]
  );

  const handleValidateDispute = useCallback(() => {
    handleVoting(1);
  }, [handleVoting]);

  const handleInvalidateDispute = useCallback(() => {
    handleVoting(2);
  }, [handleVoting]);

  useEffect(() => {
    const asyncGetDisputeById = async () => {
      if (!id) return;
      openBackdrop("Hold on, we are fetching the dispute details...");
      try {
        const disputeSystem = new DisputePool();
        const dispute = await disputeSystem.getDisputeById(id);
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
        const details = await (
          await fetch(`${dispute.uri}/dispute.json`)
        ).json();
        const selectedArbitersObject = selectedArbiters.reduce((prev, curr) => {
          const { arbiter, hasVoted, decision } = curr;
          return {
            ...prev,
            [arbiter]: {
              hasVoted,
              decision,
            },
          };
        }, {});
        console.log(selectedArbitersObject);
        setDispute({
          description: details.info,
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
          additionalDetails: details,
        });
      } catch (error) {
        console.log(error);
      } finally {
        closeBackdrop();
      }
    };
    asyncGetDisputeById();
  }, [address, closeBackdrop, id, openBackdrop]);

  return (
    <>
      <Meta title="Dispute Details" />
      {isPageViewable && (
        <Card sx={{ my: 4 }}>
          <CardContent>
            <Box>
              <Typography
                variant="h1"
                sx={{ textAlign: "center" }}
              >{`Case Id: ${id}`}</Typography>
              <>
                <Box>
                  <Typography variant="h5" sx={{ textAlign: "center" }}>
                    {dispute.description}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    <strong>Victim:</strong> {dispute.creator}
                  </Typography>
                  {dispute.additionalDetails &&
                    Object.keys(dispute.additionalDetails).map((key) => {
                      return (
                        <Typography variant="body1" sx={{ mt: 2 }} key={key}>
                          <strong>{`${key}: `}</strong>
                          {dispute.additionalDetails[key]}
                        </Typography>
                      );
                    })}
                </Box>
                <Box sx={{ mt: 2 }}>
                  <SmartLink href={dispute.uri} isExternal={true}>
                    <Button
                      variant="contained"
                      color="secondary"
                      sx={{ mr: 2 }}
                    >
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
              </>
            </Box>
          </CardContent>
          <CardActions sx={{ justifyContent: "center" }}>
            <RenderOnArbiter>
              {!dispute.hasStaked && dispute.state === CREATED && (
                <Staking
                  description={dispute.description}
                  handleJoinDisputePool={handleJoinDisputePool}
                />
              )}
              {dispute.state === CAN_VOTE && !isVoted && (
                <Voting
                  handleInvalidate={handleInvalidateDispute}
                  handleValidate={handleValidateDispute}
                />
              )}
            </RenderOnArbiter>
          </CardActions>
        </Card>
      )}

      {!isPageViewable && <NotArbiter />}
      <Unauthorized />
    </>
  );
};

export default DisputeDetails;
