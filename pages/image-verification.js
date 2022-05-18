import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import { Box, CircularProgress, Tab, Tabs, Typography } from "@mui/material";
import axios from "axios";
import PropTypes from "prop-types";
import { useCallback, useState } from "react";
import ImageUpload from "../components/ImageUpload";
import ImageURLInput from "../components/ImageURLInput";
import ImageVerificationHeader from "../components/ImageVerificationHeader";
import SimilarImageList from "../components/SimilarImageList";

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
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);

  const handleChange = useCallback(
    (_event, newValue) => {
      setImages([]);
      setValue(newValue);
    },
    [setImages, setValue]
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

  const handleURLSearch = async () => {
    if (imageURL.length !== 0) {
      setOpen(true);
      const headers = {
        "Content-Type": "application/json",
        Authorization: IMG_VERIFY_API_KEY,
      };
      const res = await axios.post(
        "https://api.nftport.xyz/v0/duplicates/urls",
        { url: imageURL, ...params },
        { headers }
      );
      const { similar_nfts } = res.data;
      console.log(similar_nfts);
      const sortedImages = similar_nfts.sort(orderBySimilarityDesc);
      setImages(sortedImages);
      setOpen(false);
      setImageURL("");
    } else {
      setImages([]);
    }
  };

  const handleImageSearch = async () => {
    if (imageFile.length !== 0) {
      const formData = new FormData();
      formData.append("file", imageFile[0]);
      setOpen(true);

      const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: IMG_VERIFY_API_KEY,
      };

      const res = await axios.post(
        "https://api.nftport.xyz/v0/duplicates/files",
        formData,
        { params, headers }
      );
      const { similar_nfts } = res.data;
      console.log(similar_nfts);
      const sortedImages = similar_nfts.sort(orderBySimilarityDesc);
      setImages(sortedImages);
      setOpen(false);
      setImageFile([]);
    }
  };

  const handleURLChange = useCallback(
    (event) => {
      setImageURL(event.target.value);
    },
    [setImageURL]
  );

  return (
    <Box sx={{ minHeight: "70vh" }}>
      <ImageVerificationHeader />
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Image Verification Tabs"
          centered
          variant="standard"
        >
          <Tab icon={<InsertLinkIcon />} label="INPUT URL" {...a11yProps(0)} />
          <Tab
            icon={<CloudUploadIcon />}
            label="UPLOAD IMAGE"
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <ImageURLInput
          handleURLChange={handleURLChange}
          imageURL={imageURL}
          handleSearch={handleURLSearch}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ImageUpload
          setImageFile={setImageFile}
          handleSearch={handleImageSearch}
        />
      </TabPanel>
      <Box sx={{ p: "1.5rem", textAlign: "center" }}>
        {open ? (
          <Box sx={{ textAlign: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          <SimilarImageList images={images} />
        )}
      </Box>
    </Box>
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
