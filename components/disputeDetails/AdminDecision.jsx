import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { NFTStorage } from "nft.storage";
import { useSnackbar } from "notistack";
/* import CountDownTimer from "../../components/CountDownTimer"; */
import { useCallback, useState } from "react";
import { NFT_STORAGE_IPFS_KEY } from "../../config";
import { useResolutioBackdropContext } from "../../context/ResolutioBackdropContext";
import DisputeNFT from "../../integrations/DisputeNFT";
import DisputePool from "../../integrations/DisputePool";
import AdminDecisionSuccess from "./AdminDecisionSuccess";

const defaultValues = {
  additional_details: "",
  nft_mint_value: 1
};

const AdminDecision = ({ disputeID }) => {

  console.log('inside AdminDecision', disputeID);



  // const [mintAmount, setmintAmount] = useState(0);


  const { enqueueSnackbar } = useSnackbar();
  const { openBackdrop, closeBackdrop } = useResolutioBackdropContext();
  const [formValues, setFormValues] = useState(defaultValues);
  const [isDecisionCreated, setDecisionCreated] = useState(false);

  const createDecision = useCallback(() => {
    const createDisputeAsync = async () => {
      openBackdrop("Hold on, while we upload your decision...");
      // Object for creating Dispute JSON
      let mintValue = 10;
      const disputeObject = {
        additionalInfo: formValues["additional_details"],
        mintAmount: formValues["nft_mint_value"],
        disputeID: disputeID
      };
      console.log('disputeObject', disputeObject);
      // return;
      // File list for uploading to IPFS
      const fileList = [
        new File([JSON.stringify(disputeObject, null, 2)], "decision.json"),
        // ...formValues.files.map((file) => new File([file], file?.name)),
      ];

      try {
        const client = new NFTStorage({
          endpoint: "https://api.nft.storage",
          token: NFT_STORAGE_IPFS_KEY,
        });
        const disputePoolInstance = new DisputeNFT();
        // Store Evidence on IPFS
        const cid = await client.storeDirectory(fileList);
        // let cid = 'asd'
        const ipfsURL = `https://ipfs.io/ipfs/${cid}`;
        console.log('ipfsURL', ipfsURL);

        // Create dispute on Blockchain
        await disputePoolInstance.mintToken(disputeID, mintValue, ipfsURL);

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
  }, [clearForm, closeBackdrop, disputeID, enqueueSnackbar, formValues, openBackdrop]);

  const handleInputChange = useCallback(
    (e) => {
      console.log('checking input', e.target.value);
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
      console.log('submit')
      createDecision();
    },
    [createDecision]
  );



  // const handleMintChange = useCallback(
  //   (e) => {
  //     console.log(e.target.value);
  //     const { value } = e.target;
  //     setmintAmount(value);
  //   },
  //   [setmintAmount]
  // );


  // const handleAccept = useCallback((e) => {
  //   console.log(e.target.value);
  //   const { value } = e.target;
  //   console.log(mintAmount);
  //   // handleDecision(mintAmount);
  // }, [mintAmount]
  // );

  // const handleDecline = useCallback(() => {
  //   handleDecision(2);
  // }, [handleDecision]);

  return (
    <Box>
      {false && (<Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>Admin Decision</Typography>
        {/* <CountDownTimer expiryTimestamp={1656530040208} /> */}
        {/* <TextField
          id="mint_amount-input"
          name="mint_amount"
          label="Amount to be minted"
          type="number"
          fullWidth
          value={mintAmount}
          // onChange={handleInputChange}
        /> */}
        {/* <Box sx={{ textAlign: "center", mt: 1 }}>
          <Button variant="contained" color="primary" onClick={handleAccept}>
            Mint NFT
          </Button>
        </Box> */}
      </Box>)}

      {!isDecisionCreated && (
        <form onSubmit={handleFormSubmit}>
          <Grid container spacing={2} direction="column">
            <Grid item>
              <TextField
                id="mint_value-input"
                name="nft_mint_value"
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
                Mint NFT as
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
