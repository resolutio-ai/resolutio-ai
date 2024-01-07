import { Box, Button, Grid, TextField } from "@mui/material";
import { File, NFTStorage } from "nft.storage";
import { useSnackbar } from "notistack";
import { useCallback, useState } from "react";
import { NFT_STORAGE_IPFS_KEY } from "../../config";
import { useResolutioBackdropContext } from "../../context/ResolutioBackdropContext";
import DisputePool from "../../integrations/DisputePool";
import AttachEvidence from "./AttachEvidence";
import DisputeCreationSuccess from "./DisputeCreationSuccess";

const defaultValues = {
  party_details: "",
  art_id: "",
  summary: "",
  case_details: "",
  type: "",
  attached_files: 0,
  files: [],
};

const DisputeResolutionForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { openBackdrop, closeBackdrop } = useResolutioBackdropContext();
  const [formValues, setFormValues] = useState(defaultValues);
  const [isDisputeCreated, setDisputeCreated] = useState(false);

  const createDispute = useCallback(() => {
    const createDisputeAsync = async () => {
      openBackdrop("Hold on, while we create your dispute...");
      // Object for creating Dispute JSON
      const disputeObject = {
        partyDetails: formValues["party_details"],
        artId: formValues["art_id"],
        summary: formValues["summary"],
        details: formValues["case_details"],
        type: formValues["type"],
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
        await disputePoolInstance.createDispute(cid);

        setDisputeCreated(true);
        clearForm();
      } catch (error) {
        console.log(error);
        enqueueSnackbar(
          "An error occurred while creating dispute. Please try again.",
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
        <form onSubmit={handleFormSubmit}>
          <Grid container spacing={2} direction="column">
            <Grid item>
              <TextField
                id="party_details-input"
                name="party_details"
                label="Opposite Party/Parties(persons against whom you’re imitating this dispute)"
                type="text"
                required
                fullWidth
                value={formValues.party_details}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item>
              <TextField
                id="art_id-input"
                name="art_id"
                label="Art ID (If the art is already recorded on creator armour)"
                required
                fullWidth
                value={formValues.art_id}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item>
              <TextField
                id="summary-input"
                name="summary"
                label="Summary of dispute(250 char.)"
                type="text"
                fullWidth
                value={formValues.summary}
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
                id="type-input"
                name="type"
                label="Dispute Type(Drawing, Design, Music, Illustration, Video, Code, Film, Literature)"
                type="text"
                fullWidth
                value={formValues.subject}
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
      )}
      {isDisputeCreated && <DisputeCreationSuccess />}
    </Box>
  );
};

export default DisputeResolutionForm;
