import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import {
  Alert,
  Box,
  CircularProgress,
  Snackbar,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import axios from "axios";
import PropTypes from "prop-types";
import { useCallback, useState } from "react";
import ImageUpload from "../components/ImageUpload";
import ImageURLInput from "../components/ImageURLInput";
import ImageVerificationHeader from "../components/ImageVerificationHeader";
import Meta from "../components/seo/Meta";
import SimilarImageList from "../components/SimilarImageList";
import {
  INPUT_URL_TAB_LABEL,
  UPLOAD_IMAGE_TAB_LABEL,
} from "../constants/strings";
import { isInputImage } from "../utility/utils";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const ImageVerification = ({ IMG_VERIFY_BASE_URL, IMG_VERIFY_API_KEY }) => {
  const [imageURL, setImageURL] = useState("");
  const [imageFile, setImageFile] = useState([]);
  const [images, setImages] = useState([]);
  const [isEmptySearch, setEmptySearch] = useState(false);
  const [open, setOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [alert, setAlert] = useState(false);
  const [isValidURL, setValidURL] = useState(true);

  const resetValues = useCallback(() => {
    setImageURL("");
    setImageFile([]);
    setImages([]);
    setEmptySearch(false);
    setOpen(false);
    setAlert(false);
    setValidURL(true);
  }, [setImageURL, setImageFile, setImages, setEmptySearch, setOpen, setAlert]);

  const handleChange = useCallback(
    (_event, newValue) => {
      resetValues();
      setTabValue(newValue);
    },
    [setTabValue, resetValues]
  );

  const params = { page_number: 1, page_size: 50, threshold: 0.95 };

  const orderBySimilarityDesc = (a, b) => {
    if (a.similarity < b.similarity) {
      return 1;
    }
    if (a.similarity > b.similarity) {
      return -1;
    }
    return 0;
  };

  const handleAlertClose = (_event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert(false);
  };

  const handleURLSearch = async () => {
    setImages([]);
    setEmptySearch(false);

    if (imageURL.length === 0) return;

    const isValid = await isInputImage(imageURL);
    setValidURL(isValid);

    if (!isValid) return;

    setOpen(true);
    const headers = {
      "Content-Type": "application/json",
      Authorization: IMG_VERIFY_API_KEY,
    };
    try {
      const res = await axios.post(
        `${IMG_VERIFY_BASE_URL}duplicates/urls`,
        { url: imageURL, ...params },
        { headers }
      );
      const { similar_nfts } = res.data;
      console.log(similar_nfts);
      if (!similar_nfts.length) setEmptySearch(true);
      const sortedImages = similar_nfts.sort(orderBySimilarityDesc);
      setImages(sortedImages);
      setOpen(false);
      setImageURL("");
    } catch (error) {
      console.log(error);
      setAlert(true);
      setImages([]);
    } finally {
      setOpen(false);
    }
  };

  const handleImageSearch = async () => {
    if (imageFile.length === 0) return;

    const formData = new FormData();
    formData.append("file", imageFile[0]);
    setOpen(true);

    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: IMG_VERIFY_API_KEY,
    };

    const res = await axios.post(
      `${IMG_VERIFY_BASE_URL}duplicates/files`,
      formData,
      { params, headers }
    );
    const { similar_nfts } = res.data;
    console.log(similar_nfts);
    if (!similar_nfts.length) setEmptySearch(true);
    const sortedImages = similar_nfts.sort(orderBySimilarityDesc);
    setImages(sortedImages);
    setOpen(false);
    setImageFile([]);
  };

  const handleURLChange = useCallback(
    (event) => {
      setImageURL(event.target.value);
    },
    [setImageURL]
  );

  return (
    <>
      <Meta
        title="NFT Theft Check"
        keywords="NFT theft, NFT scam, NFT phishing, NFT image search, NFT duplication, NFT image verification, image duplication"
      />
      <Box sx={{ minHeight: "70vh" }}>
        <ImageVerificationHeader />
        <Box>
          <Tabs
            value={tabValue}
            onChange={handleChange}
            aria-label="Image Verification Tabs"
            centered
            variant="standard"
          >
            <Tab
              icon={<CloudUploadIcon />}
              label={UPLOAD_IMAGE_TAB_LABEL}
              {...a11yProps(0)}
            />
            <Tab
              icon={<InsertLinkIcon />}
              label={INPUT_URL_TAB_LABEL}
              {...a11yProps(1)}
            />
          </Tabs>
        </Box>
        <TabPanel value={tabValue} index={0}>
          <ImageUpload
            setImageFile={setImageFile}
            handleSearch={handleImageSearch}
            imageFile={imageFile}
          />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <ImageURLInput
            handleURLChange={handleURLChange}
            imageURL={imageURL}
            handleSearch={handleURLSearch}
            isValidURL={isValidURL}
          />
        </TabPanel>
        <Box sx={{ p: "1.5rem", textAlign: "center" }}>
          {open ? (
            <Box sx={{ textAlign: "center" }}>
              <CircularProgress />
            </Box>
          ) : (
            <SimilarImageList images={images} isEmptySearch={isEmptySearch} />
          )}
        </Box>
      </Box>
      <Snackbar
        open={alert}
        autoHideDuration={6000}
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleAlertClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          Failed to perform image verification. Please check the URL/Image.
        </Alert>
      </Snackbar>
    </>
  );
};

export const getStaticProps = async () => {
  // Pass env variables to the page via props
  return {
    props: {
      IMG_VERIFY_BASE_URL: process.env.IMG_VERIFICATION_BASE_URL,
      IMG_VERIFY_API_KEY: process.env.IMG_VERIFICATION_API_KEY,
    },
  };
};

export default ImageVerification;
