import { Alert, Box, Button, TextField } from "@mui/material";
import React from "react";
import {
  INVALID_URL_ERROR_MESSAGE,
  SEARCH_IMAGE_BUTTON_LABEL,
} from "../../constants/strings";

const ImageURLInput = ({
  imageURL,
  handleURLChange,
  handleSearch,
  isValidURL,
}) => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <TextField
          id="outlined-basic"
          sx={{ width: "100%" }}
          label="Image URL"
          variant="outlined"
          value={imageURL}
          onChange={handleURLChange}
        />
        <Button
          variant="contained"
          sx={{ ml: "1rem", px: "2rem" }}
          onClick={handleSearch}
          disabled={!imageURL}
        >
          {SEARCH_IMAGE_BUTTON_LABEL}
        </Button>
      </Box>
      {!isValidURL && (
        <Alert severity="error" sx={{ backgroundColor: "white", p: 0 }}>
          {INVALID_URL_ERROR_MESSAGE}
        </Alert>
      )}
    </>
  );
};

export default ImageURLInput;
