import { Box, Button, Grid, TextField } from "@mui/material";
import { File, NFTStorage } from "nft.storage";
import { useSnackbar } from "notistack";
import { useCallback, useState } from "react";
import { NFT_STORAGE_IPFS_KEY } from "../../config";
import DisputePool from "../../integrations/DisputePool";
import BackdropLoader from "../loaders/BackdropLoader";
import AttachEvidence from "./AttachEvidence";
import DisputeCreationSuccess from "./DisputeCreationSuccess";

const defaultValues = {
  nft_id: "",
  nft_url: "",
  marketplace: "",
  info: "",
  subject: "",
  case_details: "",
  attached_files: 0,
  files: [],
};

const DisputeResolutionForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [formValues, setFormValues] = useState(defaultValues);
  const [openLoader, setOpenLoader] = useState(false);
  const [isDisputeCreated, setDisputeCreated] = useState(false);

  const handleCloseLoader = useCallback(() => {
    setOpenLoader(false);
  }, []);
  const handleOpenLoader = useCallback(() => {
    setOpenLoader(true);
  }, []);

  const createDispute = useCallback(() => {
    const createDisputeAsync = async () => {
      handleOpenLoader();
      // Object for creating Dispute JSON
      const disputeObject = {
        nftID: formValues["nft_id"],
        nftURL: formValues["nft_url"],
        marketplace: formValues["marketplace"],
        info: formValues["info"],
        subject: formValues["subject"],
        details: formValues["case_details"],
        additionalInfo: formValues["additional_details"],
        attachedFiles: formValues["attached_files"],
      };
      // File list for uploading to IPFS
      const fileList = [
        new File(
          [`Resolutio case created on ${new Date().toTimeString()}`],
          "description.txt"
        ),
        new File([JSON.stringify(disputeObject, null, 2)], "dispute.json"),
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
        await disputePoolInstance.createDispute(ipfsURL);

        setDisputeCreated(true);
        clearForm();
      } catch (error) {
        console.log(error);
        enqueueSnackbar(
          "An error occurred while creating dispute. Please try again.",
          { variant: "error" }
        );
      } finally {
        handleCloseLoader();
      }
    };
    createDisputeAsync();
  }, [
    clearForm,
    enqueueSnackbar,
    formValues,
    handleCloseLoader,
    handleOpenLoader,
  ]);

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

  const handleAttachEvidence = useCallback(
    (files) => {
      formValues["attached_files"] += 1;
      setFormValues({
        ...formValues,
        files,
      });
    },
    [setFormValues, formValues]
  );

  return (
    <Box
      sx={{
        maxWidth: "45rem",
        margin: "2rem auto",
      }}
    >
      {!isDisputeCreated && (
        <>
          <BackdropLoader
            open={openLoader}
            msg={"Please wait while dispute is being created."}
          />
          <form onSubmit={handleFormSubmit}>
            <Grid container spacing={2} direction="column">
              <Grid item>
                <TextField
                  id="nft_id-input"
                  name="nft_id"
                  label="NFT (ASSET) ID"
                  type="text"
                  required
                  fullWidth
                  value={formValues.nft_id}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item>
                <TextField
                  id="nft_url-input"
                  name="nft_url"
                  label="NFT URL"
                  required
                  fullWidth
                  type="url"
                  value={formValues.nft_url}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item>
                <TextField
                  id="marketplace-input"
                  name="marketplace"
                  label="Marketplace"
                  type="text"
                  fullWidth
                  value={formValues.marketplace}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item>
                <TextField
                  id="info-input"
                  name="info"
                  label="Information Pertaining to the Concerned Parties"
                  type="text"
                  fullWidth
                  value={formValues.info}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item>
                <TextField
                  id="subject-input"
                  name="subject"
                  label="Subject Matter(i.e. Art, Music, Document, etc.)"
                  type="text"
                  fullWidth
                  value={formValues.subject}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item>
                <TextField
                  id="case_details-input"
                  name="case_details"
                  label="Case Details"
                  type="text"
                  fullWidth
                  value={formValues.case_details}
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
                <AttachEvidence setFiles={handleAttachEvidence} />
                <ul>
                  {formValues.files.map((file) => (
                    <li key={file.size}>{file.name}</li>
                  ))}
                </ul>
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
        </>
      )}
      {isDisputeCreated && <DisputeCreationSuccess />}
    </Box>
  );
};

export default DisputeResolutionForm;
