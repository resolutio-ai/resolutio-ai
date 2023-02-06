import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { DISPUTE_STATE } from '../../../constants/constants';
import AdminDecision from '../AdminDecision';

// const steps = ['Dispute Initiated', 'Arbiter Selection', 'Can Vote', 'Compute Result', 'End'];
const steps = DISPUTE_STATE;

export default function DisputeStatusStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === 9;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
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
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
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
                  <Typography sx={{ mt: 2, mb: 1 }}>
                    Dispute has been raised
                  </Typography>
                </React.Fragment>,
                1: <React.Fragment>
                  <Typography sx={{ mt: 2, mb: 1 }}>
                    Select arbitors
                  </Typography>
                </React.Fragment>,
                2: <React.Fragment>
                  <Typography sx={{ mt: 2, mb: 1 }}>
                    Allow arbitor to vote next
                  </Typography>
                </React.Fragment>,
                3: <React.Fragment>
                  <Typography sx={{ mt: 2, mb: 1 }}>
                    Compute the results
                  </Typography>
                </React.Fragment>,
                4: <React.Fragment>
                  <Box sx={{ display: 'flex', flexDirection: 'column' , justifyContent: 'center', width: '100%' }}>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                      End the dispute and mint tokens
                    </Typography>
                    <AdminDecision />
                  </Box>
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
