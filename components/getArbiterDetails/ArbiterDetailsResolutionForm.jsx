import { Box, Button, Grid, TextField } from "@mui/material";
import { useSnackbar } from "notistack";
import { useCallback, useState } from "react";
import { LIGHTHOUSE_KEY_DISPUTE } from "../../config";
import { useResolutioBackdropContext } from "../../context/ResolutioBackdropContext";
import DetailsCreationSuccess from "./ArbiterDetailsCreationSuccess";
import lighthouse from '@lighthouse-web3/sdk';

const defaultValues = {
  wallet_address: "",
  socials: "",
  why_arbiter: "",
  arbiter_example: "",
  area_of_expertise: "",
  formal_training: "",
};

const DetailsResolutionForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { openBackdrop, closeBackdrop } = useResolutioBackdropContext();
  const [formValues, setFormValues] = useState(defaultValues);
  const [isArbiterCreated, setArbiterCreated] = useState(false);

  const createArbiter = useCallback(() => {
    const createArbiterAsync = async () => {
      openBackdrop("Hold on, while we submit your arbiter data...");
      // Object for creating Dispute JSON
      const arbiterObject = {
        walletAddress: formValues["wallet_address"],
        socials: formValues["socials"],
        areaOfExpertise: formValues["area_of_expertise"],
        details: formValues["why_arbiter"],
        additionalInfo: formValues["arbiter_example"],
        attachedFiles: formValues["formal_training"],
      };
      // File list for uploading to IPFS
      const fileList = [
        new File(
          [`Arbiter request created on ${new Date().toTimeString()}`],
          "description.txt"
        ),
        new File([JSON.stringify(arbiterObject, null, 2)], "arbiter.json"),
        //...formValues.files.map((file) => new File([file], file?.name)),
      ];

      try {

        
        const progressCallback = (progressData) => {
          let percentageDone =
            100 - (progressData?.total / progressData?.uploaded)?.toFixed(2)
          console.log(percentageDone)
        };

        const response = await lighthouse.upload(
          fileList, LIGHTHOUSE_KEY_DISPUTE, FILE_UPLOAD,
          null,
          progressCallback);
        console.log("response", response);
        const folderHash = response.data.find(item => item.Name === "").Hash;
        const ipfsURL = `https://gateway.lighthouse.storage/ipfs/${folderHash}`;
        console.log('ipfs', ipfsURL);

      
        // const disputePoolInstance = new DisputePool();
        // Store Evidence on IPFS
        // Create dispute on Blockchain
        // await disputePoolInstance.createDispute(ipfsURL);

        setArbiterCreated(true);
        clearForm();
      } catch (error) {
        console.log(error);
        enqueueSnackbar(
          "An error occurred while creating Arbiter request. Please try again.",
          { variant: "error" }
        );
      } finally {
        closeBackdrop();
      }
    };
    createArbiterAsync();
  }, [closeBackdrop, enqueueSnackbar, formValues, openBackdrop]);

  const handleInputChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormValues({
        ...formValues,
        [name]: value,
      });
    },
    [setFormValues, formValues]
  );

  const clearForm = useCallback(() => {
    setFormValues(defaultValues);
  }, [setFormValues]);

  const handleFormSubmit = useCallback(
    (event) => {
      event.preventDefault();
      createArbiter();
    },
    [createArbiter]
  );

  return (
    <Box
      sx={{
        maxWidth: "45rem",
        margin: "2rem auto",
      }}
    >
      {!isArbiterCreated && (
        <form onSubmit={handleFormSubmit}>
          <Grid container spacing={2} direction="column">
            <Grid item>
              <TextField
                id="wallet_address-input"
                name="wallet_address"
                label="Wallet Address"
                type="text"
                required
                fullWidth
                value={formValues.wallet_address}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item>
              <TextField
                id="socials-input"
                name="socials"
                label="Links to Socials"
                required
                fullWidth
                type="url"
                value={formValues.socials}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item>
              <TextField
                id="why_arbiter-input"
                name="why_arbiter"
                label="Why you think you'd make a fair arbiter?"
                type="text"
                fullWidth
                value={formValues.why_arbiter}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item>
              <TextField
                id="arbiter_example-input"
                name="arbiter_example"
                label="Have there been any incidents where you had to resolve or evaluate a dispute ? If yes, please give example of one."
                multiline
                rows={4}
                fullWidth
                value={formValues.arbiter_example}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item>
              <TextField
                id="area_of_expertise-input"
                name="area_of_expertise"
                label="What area of disputes are you most comfortable adjudicating?"
                type="text"
                fullWidth
                value={formValues.area_of_expertise}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item>
              <TextField
                id="formal_training-input"
                name="formal_training"
                label="Do you have any formal training on adjudicating disputes ?"
                type="text"
                fullWidth
                value={formValues.formal_training}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
      {isArbiterCreated && <DetailsCreationSuccess />}
    </Box>
  );
};

export default DetailsResolutionForm;
