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
import CountDownTimer from "../../components/CountDownTimer";
import StakingDialog from "../../components/dialogs/StakingDialog";
import BackdropLoader from "../../components/loaders/BackdropLoader";
import NotArbiter from "../../components/NotArbiter";
import RenderOnArbiter from "../../components/RenderOnArbiter";
import Meta from "../../components/seo/Meta";
import SmartLink from "../../components/SmartLink";
import Unauthorized from "../../components/Unauthorized";
import { CAN_VOTE, CREATED } from "../../constants/constants";
import { useResolutioContext } from "../../context/ResolutioContext";
import DisputePool from "../../integrations/DisputePool";

const DisputeDetails = () => {
  const router = useRouter();
  const { address, isArbiter } = useResolutioContext();
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
  const [isStakingDialogOpen, setStakingDialogOpen] = useState(false);
  const [isVoted, setVoted] = useState(false);
  const [isFullScreenLoaderOpen, setFullScreenLoaderOpen] = useState(false);
  const [loaderMsg, setLoaderMsg] = useState("");

  const isPageViewable = useMemo(
    () => isArbiter || dispute.creator === address,
    [address, dispute, isArbiter]
  );
  const handleStakingDialogOpen = useCallback(() => {
    setStakingDialogOpen(true);
  }, []);

  const handleStakingDialogClose = useCallback(() => {
    setStakingDialogOpen(false);
  }, []);

  const handleJoinDisputePool = useCallback(() => {
    const asyncJoinDisputePool = async () => {
      handleStakingDialogClose();
      if (!id) return;
      try {
        setLoaderMsg("Hold on tight!, Staking in progress...");
        setFullScreenLoaderOpen(true);
        const disputeSystem = new DisputePool();
        await disputeSystem.joinDisputePool(id);
        setDispute((prev) => ({ ...prev, hasStaked: true }));
      } catch (error) {
        console.log(error);
        handleStakingDialogClose();
      } finally {
        setFullScreenLoaderOpen(false);
      }
    };
    asyncJoinDisputePool();
  }, [handleStakingDialogClose, id]);

  const handleVoting = useCallback(
    (vote) => {
      const votingAsync = async () => {
        if (!id) return;
        try {
          setLoaderMsg("Hold on tight!, Voting in progress...");
          setFullScreenLoaderOpen(true);
          const disputeSystem = new DisputePool();
          await disputeSystem.vote(vote, id);
          setVoted(true);
        } catch (error) {
          console.log(error);
        } finally {
          setFullScreenLoaderOpen(false);
        }
      };
      votingAsync();
    },
    [id]
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
      } catch (error) {}
    };
    asyncGetDisputeById();
  }, [address, id]);

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
            {!dispute.hasStaked && dispute.state === CREATED && (
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h5">
                  Would you like to be an arbiter for this case ?
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={handleStakingDialogOpen}
                >
                  Stake
                </Button>
              </Box>
            )}
            {dispute.state === CAN_VOTE && !isVoted && (
              <Box>
                <Box sx={{ textAlign: "center", mb: 4 }}>
                  <Typography variant="h1">VOTE</Typography>
                  <CountDownTimer expiryTimestamp={1656530040208} />
                  <Box>
                    <Button
                      variant="contained"
                      color="secondary"
                      sx={{ mr: 4 }}
                      onClick={handleInvalidateDispute}
                    >
                      Invalidate NFT
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleValidateDispute}
                    >
                      Validate NFT
                    </Button>
                  </Box>
                </Box>
              </Box>
            )}
          </CardActions>
        </Card>
      )}
      <RenderOnArbiter>
        <StakingDialog
          open={isStakingDialogOpen}
          onClose={handleStakingDialogClose}
          onAction={handleJoinDisputePool}
          description={dispute.description}
        />
      </RenderOnArbiter>
      {!isPageViewable && <NotArbiter />}
      <Unauthorized />
      <BackdropLoader open={isFullScreenLoaderOpen} msg={loaderMsg} />
    </>
  );
};

export default DisputeDetails;
