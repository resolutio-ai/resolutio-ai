import { Card, CardActions, CardContent } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";
import DisputeInfomation from "../../components/disputeDetails/DisputeInfomation";
import DisputeTools from "../../components/disputeDetails/DisputeTools";
import Staking from "../../components/disputeDetails/Staking";
import Voting from "../../components/disputeDetails/Voting";
import NotArbiter from "../../components/NotArbiter";
import RenderOnArbiter from "../../components/RenderOnArbiter";
import Meta from "../../components/seo/Meta";
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
  // Initail State
  const [dispute, setDispute] = useState({
    title: "",
    description: "",
    hasStaked: false,
    arbiterCount: 0,
    createdAt: "",
    creator: "",
    disputeId: "",
    disputePool: [],
    selectedArbiters: {},
    state: 0,
    uri: "",
    winningProposal: 0,
    additionalDetails: null,
  });

  // Is the dispute created by the current user?
  const isOwnDispute = useMemo(
    () => dispute.creator === address,
    [dispute, address]
  );

  const isPageViewable = useMemo(
    () => isArbiter || isOwnDispute,
    [isArbiter, isOwnDispute]
  );

  // Check if an arbiter can vote
  const canVote = useMemo(
    () =>
      dispute.state === CAN_VOTE &&
      !isOwnDispute &&
      dispute.selectedArbiters.hasOwnProperty(address) &&
      dispute.selectedArbiters[address].hasVoted === false,
    [address, dispute, isOwnDispute]
  );

  // Check if an arbiter can stake
  const canStake = useMemo(
    () => dispute.state === CREATED && !isOwnDispute && !dispute.hasStaked,
    [dispute, isOwnDispute]
  );

  // Handle joining a dispute Pool
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

  // Handle Voting
  const handleVoting = useCallback(
    (vote) => {
      const votingAsync = async () => {
        if (!id) return;
        openBackdrop("Hold on, Voting...");
        try {
          const disputeSystem = new DisputePool();
          await disputeSystem.vote(vote, id);
          setDispute((prev) => {
            return {
              ...prev,
              selectedArbiters: {
                ...prev.selectedArbiters,
                [address]: {
                  decision: vote,
                  hasVoted: true,
                },
              },
            };
          });
        } catch (error) {
          console.log(error);
        } finally {
          closeBackdrop();
        }
      };
      votingAsync();
    },
    [address, closeBackdrop, id, openBackdrop]
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
        // Get Dispute information from blockchain
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

        // Get dispute information from IPFS
        const additionalDetails = await (
          await fetch(`${dispute.uri}/dispute.json`)
        ).json();

        // Reduce the selected arbiter object to an efficient DS
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

        setDispute({
          description: additionalDetails.info,
          hasStaked: disputePool.includes(address),
          arbiterCount,
          createdAt,
          creator,
          disputeId,
          disputePool,
          selectedArbiters: selectedArbitersObject,
          state,
          uri,
          winningProposal,
          additionalDetails,
        });
      } catch (error) {
        console.log(error);
        // TODO: Handle error for edge cases in future
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
            <DisputeInfomation dispute={dispute} />
            <DisputeTools uri={dispute.uri} />
          </CardContent>
          <CardActions sx={{ justifyContent: "center" }}>
            <RenderOnArbiter>
              {canStake && (
                <Staking
                  description={dispute.description}
                  handleJoinDisputePool={handleJoinDisputePool}
                />
              )}
              {canVote && (
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
