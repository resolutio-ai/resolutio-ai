import { Alert, Box, Button, Grid, IconButton, Snackbar, Stack, TextField } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { jsPDF } from "jspdf";
import { useCallback, useState } from "react";
import AttachEvidence from "./AttachEvidence";

import ReactPDF from '@react-pdf/renderer';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import { useEffect } from 'react';
import { create } from "ipfs-http-client";

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

// const client = create('https://ipfs.infura.io:5001/api/v0');

import { NFTStorage, File } from 'nft.storage'
const client = new NFTStorage({
  endpoint: 'https://api.nft.storage',
  token: process.env.NEXT_PUBLIC_NFT_STORAGE_IPFS_KEY
})

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
  const [isClient, setIsClient] = useState(false)
  const [openAlert, setOpenAlert] = useState(false);
  const [openLoader, setOpenLoader] = useState(false);

  const handleOpenAlert = () => {
    setOpenAlert(true);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };


  const handleCloseLoader = () => {
    setOpenLoader(false);
  };
  const handleOpenLoader = () => {
    setOpenLoader(true);
  };

  useEffect(() => {
    setIsClient(true)
  }, [])

  async function uploadToIpfs(formValues) {
    handleOpenLoader();
    // e.preventDefault();
    let pdfContent;
    try {
      pdfContent = [
        { text: "NFT ID", value: formValues["nft_id"] },
        { text: "NFT URL", value: formValues["nft_url"] },
        { text: "Marketplace", value: formValues["marketplace"] },
        {
          text: "Information Pertaining to the Concerned Parties",
          value: formValues["info"],
        },
        {
          text: "Subject Matter(i.e. Art, Music, Document, etc.)",
          value: formValues["subject"],
        },
        { text: "Case Details", value: formValues["case_details"] },
      ];
      console.log(pdfContent);
    } catch (error) {
      console.log('error in data');
      handleCloseLoader();
      handleOpenAlert();
    }
    try {
      let fileArray = [
        new File([`Resolutio case created on ${new Date().toTimeString()}`], 'description.txt'),
        new File([JSON.stringify(pdfContent, null, 2)], 'formData.json')
      ];
      if (formValues.files.length > 0) {
        formValues.files.forEach(item => {
          fileArray.push(new File([item], item?.name))
        });
      }
      const cid = await client.storeDirectory(

        fileArray
      )
      console.log(cid)
      console.log(`https://ipfs.io/ipfs/${cid}`)
      if (cid) {
        clearForm();
      }
    } catch (error) {
      console.log(error);
      console.log(error.message);
      handleOpenAlert();
      handleCloseLoader();
    }
   
    handleCloseLoader();

  }

  const createPDF = useCallback(() => {
    uploadToIpfs(formValues);

    return;


    // ReactPDF.render(<MyDocument />, `${__dirname}/example.pdf`);

  }, [formValues]);

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4'
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    },
    image: {
      width: 500,
      height: 500,
    },
  });
  // Creating PDF : Future use
  const MyDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <Image
          style={styles.image}
          src="https://image.shutterstock.com/image-photo/tiny-floating-house-on-lake-600w-1980476267.jpg"
        />
        <View style={styles.section}>
          <Text>NFT ID</Text>
          <Text>NFT URL</Text>
          <Text>Marketplace</Text>
        </View>
        <View style={styles.section}>
          <Text>Section #2</Text>
        </View>
      </Page>
    </Document>
  );

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
      console.log(formValues);
      createPDF();
      // clearForm();
    },
    [formValues, createPDF, clearForm]
  );

  const handleAttachEvidence = useCallback(
    (files) => {
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
        my: 2,
        maxWidth: "45rem",
        margin: "2rem auto",
      }}
    >
      {openAlert && (
        <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
          <Alert variant="filled" severity="error">
            Error creating dispute. Please try again.
            <IconButton
              aria-label="close"
              color="inherit"
              sx={{ p: 0.5 }}
              onClick={handleCloseAlert}
            >
              <CloseIcon />
            </IconButton>
          </Alert>
        </Snackbar>
      )}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openLoader}
      >
        <Stack spacing={2} alignItems="center">
          < >Please wait while dispute is being created</>
          <CircularProgress color="primary" />
        </Stack>



      </Backdrop>
      {/* {isClient && <PDFViewer>
        <MyDocument />
      </PDFViewer>}

      {isClient && (
        <PDFDownloadLink document={<MyDocument />} fileName="fee_acceptance.pdf">
          {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
        </PDFDownloadLink>
      )} */}

      {/* https://react-pdf.org/ */}
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
