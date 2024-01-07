import { Box, Button } from "@mui/material";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const AttachEvidence = ({ setFiles }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      // Do something with the files
      setFiles(acceptedFiles);
    },
    [setFiles]
  );
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Box sx={{ display: "inline" }} {...getRootProps()}>
      <input {...getInputProps()} />
      <Button variant="contained">Attach Evidence</Button>
      <div>
        (Add relevant links, IDs and documents into one document and upload it.)
      </div>
    </Box>
  );
};

export default AttachEvidence;
