import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { DISPUTE_STATE, MIN_NO_ARBITER } from '../../../constants/constants';
import AdminDecision from '../AdminDecision';

import { useSnackbar } from 'notistack';
import { useState } from "react";
import { useResolutioBackdropContext } from '../../../context/ResolutioBackdropContext';
import DisputePool from "../../../integrations/DisputePool";
import { useEffect } from 'react';

// const steps = ['Dispute Initiated', 'Arbiter Selection', 'Can Vote', 'Compute Result', 'End'];
const steps = DISPUTE_STATE;

export default function DisputeStatusStepper({ dispute, disputeID }) {

  const { enqueueSnackbar } = useSnackbar();
  const { openBackdrop, closeBackdrop } = useResolutioBackdropContext();

  console.log('dispute', disputeID);
  console.log('inside stepper state', dispute.state);
  const [activeStep, setActiveStep] = useState(dispute.state);
  const [showMint, setShowMint] = useState(false);

  useEffect(() => {
    setActiveStep(dispute.state);
  }, [dispute]);


  const [skipped, setSkipped] = useState(new Set());

  console.log('inside stepper data and id', dispute, disputeID,);
  console.log('inside stepper activeStep', activeStep);

  const assignRandomArbiters = async () => {
    try {
      const disputeSystem = new DisputePool();
      const dispute = await disputeSystem.assignRandomArbiters(disputeID, [0, 1, 2]);
      console.log('response', dispute);
      return dispute;
    } catch (error) {
      console.error(error);
    }
  };

  const hasAllVoted = async () => {
    let moveNextStep = true;
    let negativeMsg = '';

    if (Object.keys(dispute.selectedArbiters).length === MIN_NO_ARBITER) {
      for (const [key, value] of Object.entries(dispute.selectedArbiters)) {
        console.log(`${key}: ${value}`);
        if (value.hasVoted === false) {
          moveNextStep = false;
          negativeMsg = 'One of the arbiters has not voted yet';
          break;
        }
      }
    } else {
      moveNextStep = false;
      negativeMsg = `Minimum ${MIN_NO_ARBITER} arbiters required in selected pool`;
    }
    setShowMint(moveNextStep);
    return { moveNextStep, negativeMsg };
  }

  const satisfyNextCondition = async () => {
    try {

      let moveNextStep = false;
      let negativeMsg = '';
      switch (activeStep) {
        case 0:
          moveNextStep = true;
          break;
        case 1:
          moveNextStep = true;
          break;
        case 2:
          // Arbiter Selection
          moveNextStep = Object.keys(dispute.disputePool).length >= dispute.arbiterCount ? true : false;
          negativeMsg = `Minimum ${dispute.arbiterCount} members required in pool to act as arbiter`;
          if (moveNextStep) {
            const res = await assignRandomArbiters();
            console.log(res);
          }
          break;
        case 3:
          // Can Vote
          moveNextStep = true;
          if (Object.keys(dispute.selectedArbiters).length !== dispute.arbiterCount) {
            negativeMsg = `Minimum ${dispute.arbiterCount} arbiters need to be selected. 
            Arbiter selection not completed. 
            Arbiters selected: ${Object.keys(dispute.selectedArbiters).length}`;
            moveNextStep = false;
          }
          break;
        case 4:
          // Compute Result
          moveNextStep = true;
          const response = await hasAllVoted();
          moveNextStep = response.moveNextStep;
          negativeMsg = response.negativeMsg;
          break;
        case 5:
          moveNextStep = true;
          break;
        default:
          moveNextStep = false;
          break;
      }
      return { moveNextStep, negativeMsg };

    } catch (error) {
      console.error(error);
      return { moveNextStep: false, negativeMsg: error.message };
    }
  };

  const isStepOptional = (step) => {
    return step === 9;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = async () => {
    const { moveNextStep, negativeMsg } = await satisfyNextCondition();
    if (!moveNextStep) {
      enqueueSnackbar(negativeMsg, { variant: 'error' });
      return;
    }

    try {
      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }
      enqueueSnackbar(
        "Inprogress",
        { variant: "warning" }
      );
      openBackdrop("Hold on, while we change state of dispute...");
      const disputeSystem = new DisputePool();
      const dispute = await disputeSystem.changeDisputeState(disputeID, '1');
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
      console.log(dispute);
      console.log('Next completed');
    } catch (error) {
      console.log(error);
      enqueueSnackbar(
        "An error occurred while moving back. Please try again.",
        { variant: "error" }
      );
    } finally {
      closeBackdrop();
    }
  };

  const handleBack = async () => {
    try {
      console.log('Back in progress');
      enqueueSnackbar(
        "Inprogress",
        { variant: "warning" }
      );
      openBackdrop("Hold on, while we change state of dispute...");
      const disputeSystem = new DisputePool();
      const dispute = await disputeSystem.changeDisputeState(disputeID, '2');
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
      console.log(dispute);
      console.log('Back completed');
    } catch (error) {
      console.log(error);
      enqueueSnackbar(
        "An error occurred while moving back. Please try again.",
        { variant: "error" }
      );
    } finally {
      closeBackdrop();
    }
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };


  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((item, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={item.value} {...stepProps}>
              <StepLabel {...labelProps}>{item.text}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re admin role is completed. Minted token has been send.
          </Typography>
          {/* <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box> */}
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            {
              {
                0: <React.Fragment>
                  <Typography sx={{ mt: 2, mb: 1, width: '100%' }}>
                    Dispute has been raised
                  </Typography>
                </React.Fragment>,
                1: <React.Fragment>
                  <Typography sx={{ mt: 2, mb: 1, width: '100%' }}>
                    Open arbitor pool
                  </Typography>
                </React.Fragment>,
                2: <React.Fragment>
                  <Typography sx={{ mt: 2, mb: 1, width: '100%' }}>
                    Select arbitor for dispute
                  </Typography>
                </React.Fragment>,
                3: <React.Fragment>
                  <Typography sx={{ mt: 2, mb: 1, width: '100%' }}>
                    Let the selected arbiter vote
                  </Typography>
                </React.Fragment>,
                4: <React.Fragment>
                  {true && (
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%' }}>
                      <Typography sx={{ mt: 2, mb: 1 }}>
                        Move to next state and end the dispute and mint tokens
                      </Typography>
                      <AdminDecision disputeID={disputeID} />
                    </Box>)}
                  {/* {!hasAllVoted().moveNextStep && (
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%' }}>
                      <Typography sx={{ mt: 2, mb: 1 }}>
                        All arbiters have not voted
                      </Typography>
                    </Box>)} */}
                </React.Fragment>,
                5: <React.Fragment>
                  {showMint && (
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%' }}>
                      <Typography sx={{ mt: 2, mb: 1 }}>
                        Dispute ended and mint tokens
                      </Typography>
                      <AdminDecision disputeID={disputeID} />
                    </Box>)}
                  {/* {!hasAllVoted().moveNextStep && (
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%' }}>
                      <Typography sx={{ mt: 2, mb: 1 }}>
                        All arbiters have not voted
                      </Typography>
                    </Box>)} */}
                </React.Fragment>
              }[activeStep]
            }
            {/* {activeStep === 1 ? (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  select arbitor
                </Typography>
              </React.Fragment>
            ) :
              (
                <React.Fragment>
                  <Typography sx={{ mt: 2, mb: 1 }}>
                    Allow arbitor to vote
                  </Typography>
                </React.Fragment>
              )
            } */}
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}

            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}