import { Box, Button, Grid, TextField } from "@mui/material";
import { useCallback, useState } from "react";
import AttachEvidence from "./AttachEvidence";

const defaultValues = {
  nft_id: "",
  nft_url: "",
  marketplace: "",
  info: "",
  subject: "",
  case_details: "",
  files: [],
};

const DisputeResolutionForm = () => {
  const [formValues, setFormValues] = useState(defaultValues);

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

  const handleFormSubmit = useCallback(
    (event) => {
      event.preventDefault();
      console.log(formValues);
    },
    [formValues]
  );

  const handleAttachEvidence = useCallback(
    (files) => {
      setFormValues({
        ...formValues,
        files,
      });
      console.log(files);
    },
    [setFormValues, formValues]
  );

  return (
    <Box
      sx={{
        my: 2,
        maxWidth: "45rem",
        margin: "2rem auto",
      }}
    >
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
            <AttachEvidence setFiles={handleAttachEvidence} />
            <ul>
              {formValues.files.map((file) => (
                <li key={file.size}>{file.name}</li>
              ))}
            </ul>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default DisputeResolutionForm;
