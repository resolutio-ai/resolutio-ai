import { HuddleIframe } from "@huddle01/huddle01-iframe";
import { Box, Card, CardActions, CardContent, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useCallback, useEffect, useMemo, useState } from "react";
import AdminDecision from "../../components/disputeDetails/AdminDecision";
import AdminTools from "../../components/disputeDetails/adminTools/AdminTools";
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
import DisputeNFT from "../../integrations/DisputeNFT";
import DisputePool from "../../integrations/DisputePool";

const DisputeDetails = () => {

  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const { address, isArbiter, isAdmin } = useResolutioContext();
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

  // Check if an admin can decide
  // ToDo: Add condition
  const canDecide = useMemo(
    () => isAdmin
  );
  //   isAdmin &&
  //   !isOwnDispute &&
  //   dispute.selectedArbiters.hasOwnProperty(address) &&
  //   dispute.selectedArbiters[address].hasVoted === false,
  // [address, dispute, isOwnDispute, isAdmin]

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

  // Handle Admin Voting
  const handleDecision = useCallback(
    (mintAmount) => {
      const votingAsync = async () => {
        if (!id) return;
        openBackdrop("Hold on, Decision is being minted...");
        console.log(mintAmount);
        const disputeID = Number(id);
        console.log('params', disputeID, mintAmount, dispute.uri);
        try {

          const disputeSystem = new DisputePool();
          disputeSystem.endVoting();
          const disputeDecision = new DisputeNFT();
          const data = await disputeDecision.mintToken(disputeID, mintAmount, dispute.uri);
          console.log(data);
        } catch (error) {
          enqueueSnackbar("Could not mint", { variant: "error" });
          console.log(error);
        } finally {
          closeBackdrop();
        }
      };
      votingAsync();
    },
    [address, closeBackdrop, id, openBackdrop]
  );

  useEffect(() => {
    const asyncGetDisputeById = async () => {
      if (!id) return;
      openBackdrop("Hold on, we are fetching the dispute details...");
      try {
        const disputeSystem = new DisputePool();
        // Get Dispute information from blockchain
        const dispute = await disputeSystem.getDisputeById(id);
        console.log('Dispute details', dispute, dispute.disputeId);
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
          await fetch(`https://nftstorage.link/ipfs/${dispute.uri}/dispute.json`)
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

  const iframeConfig = {
    roomUrl: "https://iframe.huddle01.com/123",
    height: "800px",
    width: "80%",
    noBorder: true, // false by default
  };

  return (
    <>
      <Meta title="Dispute Details" />
      {isPageViewable && (
        <Card sx={{ my: 4 }}>
          <CardContent>
            <Typography
              variant="h1"
              sx={{ textAlign: "center" }}
            >{`Case Id: ${dispute.disputeId}`}</Typography>
            <Typography variant="h5" sx={{ textAlign: "center" }}>
              {dispute.description}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              {isAdmin && (
                <Box sx={{ borderStyle: 'solid', borderWidth: '0.5px', borderColor: 'yellowgreen', padding: '10px 15px' }}>
                  <h4>Admin Tools</h4>
                  <AdminTools id={id} dispute={dispute} />
                </Box>
              )}
              <DisputeInfomation dispute={dispute} />
            </Box>
            <DisputeTools uri={`https://nftstorage.link/ipfs/${dispute.uri}`} />
          </CardContent>
          <CardActions sx={{ justifyContent: "center" }}>
            <RenderOnArbiter>
              {canStake && (
                <Staking
                  description={dispute.description}
                  handleJoinDisputePool={handleJoinDisputePool}
                />
              )}
              {canVote && <Voting handleVoting={handleVoting} />}
            </RenderOnArbiter>
          </CardActions>
          <CardActions sx={{ display: "flex", flexDirection: 'column', justifyContent: "left" }}>

            {/* {canDecide && <AdminDecision handleDecision={handleDecision} />} */}
          </CardActions>
          <CardActions>
            {/* <HuddleIframe config={iframeConfig} /> */}
          </CardActions>
        </Card>
      )
      }
      {!isPageViewable && <NotArbiter />}
      <Unauthorized />
    </>
  );
};

export default DisputeDetails;
