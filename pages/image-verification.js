import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  ImageListItemBar,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import * as Axios from "axios";
import Image from "next/image";
import PropTypes from "prop-types";
import { useCallback, useState } from "react";
import ComingSoon from "../components/ComingSoon";
import verificationImage from "../public/verification.svg";

function TabPanel(props) {
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
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ImageVerification = () => {
  const instance = Axios.create({
    baseURL: "https://api.nftport.xyz/v0/",
    headers: {
      "Content-Type": "application/json",
      Authorization: "a7e303a5-7023-41fb-a7a0-8fb93a6af965",
    },
  });

  const [imageURL, setURL] = useState("");
  const [images, setImages] = useState([]);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);

  const handleChange = (_event, newValue) => {
    setImages([]);
    setValue(newValue);
  };

  const handleSearch = async () => {
    if (imageURL.length !== 0) {
      setOpen(true);
      const res = await instance.post("duplicates/urls", {
        url: imageURL,
        page_number: 1,
        page_size: 50,
        threshold: 0.9,
      });
      console.log(res.data.similar_nfts);
      setImages(res.data.similar_nfts);
      setOpen(false);
      setURL("");
    } else {
      setImages([]);
    }
  };

  const handleURLChange = useCallback(
    (event) => {
      setURL(event.target.value);
    },
    [setURL]
  );

  return (
    <Box sx={{ minHeight: "70vh" }}>
      <Box sx={{ textAlign: "center", my: "2rem" }}>
        <Image src={verificationImage} height="100" alt="coming Soon Image" />
        <Typography variant="h1">Image Verification</Typography>
      </Box>
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Image Verification Tabs"
          centered
          focusRipple
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
          >
            Search
          </Button>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ComingSoon />
      </TabPanel>
      <Box sx={{ p: "1.5rem" }}>
        {open ? (
          <CircularProgress color="inherit" size={20} />
        ) : (
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={6}>
              {images?.map((item, index) => (
                <Grid item xs={6} sm={4} md={3} key={index}>
                  <Image
                    height={250}
                    width={250}
                    layout="responsive"
                    src={item.cached_file_url}
                    alt={item.title}
                  />
                  <ImageListItemBar
                    title={`Similarity: ${item.similarity}`}
                    subtitle={<span>Chain: {item.chain}</span>}
                    position="below"
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ImageVerification;
