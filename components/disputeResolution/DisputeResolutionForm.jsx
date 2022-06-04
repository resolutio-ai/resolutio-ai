import { Box, Button, Grid, TextField } from "@mui/material";
import { useState } from "react";

const defaultValues = {
  nft_id: "",
  nft_url: "",
  marketplace: "",
  info: "",
  subject: "",
  case_details: "",
};

const DisputeResolutionForm = () => {
  const [formValues, setFormValues] = useState(defaultValues);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formValues);
  };
  return (
    <Box
      sx={{
        my: 2,
        maxWidth: "30rem",
        margin: "2rem auto",
      }}
    >
      <form onSubmit={handleSubmit}>
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
            <Button variant="contained" component="label">
              Upload File
              <input type="file" hidden />
            </Button>
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
