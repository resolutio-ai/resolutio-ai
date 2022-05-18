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

const ImageUpload = () => {
  const styles = useStyles();
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    console.log(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    multiple: false,
    onDrop,
  });

  return (
    <Box sx={styles.dropzone} {...getRootProps()}>
      <input {...getInputProps()} />
      <Typography variant="body1">Drag and drop image here</Typography>
      {!isDragActive && (
        <>
          <Typography variant="body2">or</Typography>
          <Button variant="outlined" color="secondary">
            Select a image
          </Button>
        </>
      )}
    </Box>
  );
};

export default ImageUpload;
