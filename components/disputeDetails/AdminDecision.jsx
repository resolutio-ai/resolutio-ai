import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { NFTStorage } from "nft.storage";
import { useSnackbar } from "notistack";
/* import CountDownTimer from "../../components/CountDownTimer"; */
import { useCallback, useState } from "react";
import { useResolutioBackdropContext } from "../../context/ResolutioBackdropContext";
import AdminDecisionSuccess from "./AdminDecisionSuccess";

const AdminDecision = ({ disputeID }) => {

  console.log('inside AdminDecision', disputeID);

  const defaultValues = {
    additional_details: "",
    nft_mint_value: 0
  };

  const [mintAmount, setmintAmount] = useState(0);


  const { enqueueSnackbar } = useSnackbar();
  const { openBackdrop, closeBackdrop } = useResolutioBackdropContext();
  const [formValues, setFormValues] = useState(defaultValues);
  const [isDecisionCreated, setDecisionCreated] = useState(false);

  const createDispute = useCallback(() => {
    const createDisputeAsync = async () => {
      openBackdrop("Hold on, while we upload your decision...");
      // Object for creating Dispute JSON
      const disputeObject = {
        additionalInfo: formValues["additional_details"],
        mintAmount: formValues["mintAmount"],
        disputeID: id
      };
      // File list for uploading to IPFS
      const fileList = [
        new File([JSON.stringify(disputeObject, null, 2)], "decision.json"),
        ...formValues.files.map((file) => new File([file], file?.name)),
      ];

      try {
        const client = new NFTStorage({
          endpoint: "https://api.nft.storage",
          token: NFT_STORAGE_IPFS_KEY,
        });
        const disputePoolInstance = new DisputePool();
        // Store Evidence on IPFS
        const cid = await client.storeDirectory(fileList);
        const ipfsURL = `https://ipfs.io/ipfs/${cid}`;
        // Create dispute on Blockchain
        await disputePoolInstance.mintToken(disputeID, formValues["mintAmount"], ipfsURL);

        setDecisionCreated(true);
        clearForm();
      } catch (error) {
        console.log(error);
        enqueueSnackbar(
          "An error occurred while uploading your decision. Please try again.",
          { variant: "error" }
        );
      } finally {
        closeBackdrop();
      }
    };
    createDisputeAsync();
  }, [clearForm, closeBackdrop, enqueueSnackbar, formValues, openBackdrop]);

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
      createDispute();
    },
    [createDispute]
  );



  const handleMintChange = useCallback(
    (e) => {
      console.log(e.target.value);
      const { value } = e.target;
      setmintAmount(value);
    },
    [setmintAmount]
  );


  const handleAccept = useCallback((e) => {
    console.log(e.target.value);
    const { value } = e.target;
    console.log(mintAmount);
    // handleDecision(mintAmount);
  }, [mintAmount]
  );

  // const handleDecline = useCallback(() => {
  //   handleDecision(2);
  // }, [handleDecision]);

  return (
    <Box>
      {false && (<Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>Admin Decision</Typography>
        {/* <CountDownTimer expiryTimestamp={1656530040208} /> */}
        <TextField
          id="mint_amount-input"
          name="mint_amount"
          label="Amount to be minted"
          type="number"
          fullWidth
          value={mintAmount}
          onChange={handleMintChange}
        />
        <Box sx={{ textAlign: "center", mt: 1 }}>
          <Button variant="contained" color="primary" onClick={handleAccept}>
            Mint NFT
          </Button>
        </Box>
      </Box>)}

      {!isDecisionCreated && (
        <form onSubmit={handleFormSubmit}>
          <Grid container spacing={2} direction="column">
            <Grid item>
              <TextField
                id="mint_value-input"
                name="mint_value"
                label="Mint NFT value"
                type="number"
                required
                fullWidth
                value={formValues.nft_mint_value}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item>
              <TextField
                id="additional_details-input"
                name="additional_details"
                label="Additional Details"
                multiline
                rows={4}
                fullWidth
                value={formValues.additional_details}
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
                Mint NFT
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
      {isDecisionCreated && <AdminDecisionSuccess />}
    </Box>
  );
};

export default AdminDecision;
