import { Box, Button, Typography } from "@mui/material";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const useStyles = () => ({
  dropzone: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "25px",
    borderWidth: "2px",
    borderRadius: "2px",
    borderColor: "grey",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    outline: "none",
    cursor: "pointer",
    color: "#1f82c0",
    minHeight: "200px",
    transition: "border 0.24s ease-in-out",
  },
});

const ImageUpload = ({ imageFile, setImageFile, handleSearch }) => {
  const styles = useStyles();
  const onDrop = useCallback(
    (acceptedFiles) => {
      setImageFile(acceptedFiles);
    },
    [setImageFile]
  );
  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({
      accept: { "image/*": [] },
      multiple: false,
      onDrop,
    });

  return (
    <>
      <Box sx={styles.dropzone} {...getRootProps()}>
        <input {...getInputProps()} />
        <Typography variant="body1">Drag and drop image here</Typography>
        {!isDragActive && (
          <>
            <Typography variant="body2" sx={{ my: ".5rem" }}>
              or
            </Typography>
            <Button variant="outlined" color="secondary">
              Select an image
            </Button>
          </>
        )}
        <Typography variant="caption" sx={{ my: ".5rem" }}>
          (Only *.jpeg and *.png images will be accepted)
        </Typography>
      </Box>
      <Box sx={{ my: "1rem", textAlign: "center" }}>
        <Button
          variant="contained"
          disabled={!imageFile.length}
          onClick={handleSearch}
          sx={{ px: "2rem" }}
        >
          Search
        </Button>
        {imageFile.map((file) => {
          return (
            <Typography variant="caption" component="p" key={file.path}>
              {file.path}
            </Typography>
          );
        })}
      </Box>
    </>
  );
};

export default ImageUpload;
