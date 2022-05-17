import {
  Box,
  Button,
  CircularProgress,
  Grid,
  ImageListItemBar,
  TextField,
} from "@mui/material";
import * as Axios from "axios";
import Image from "next/image";
import * as React from "react";

const ImageVerification = () => {
  const instance = Axios.create({
    baseURL: "https://api.nftport.xyz/v0/",
    // timeout: 1000,
    headers: {
      "Content-Type": "application/json",
      Authorization: "a7e303a5-7023-41fb-a7a0-8fb93a6af965",
    },
  });

  const [imageURL, setURL] = React.useState("");
  const [images, setImages] = React.useState([]);

  const [open, setOpen] = React.useState(false);
  const loading = open && images.length === 0;

  const handleSearch = async () => {
    setOpen(true);
    const res = await instance.post("duplicates/urls", {
      url: imageURL,
      page_number: 1,
      page_size: 50,
      threshold: 0.9,
    });
    console.log("input change api call");
    console.log(res.data.similar_nfts);
    setImages(res.data.similar_nfts);
    setOpen(false);
    return {
      props: { data: res.data.similar_nfts },
    };
  };

  const handleURLChange = (event) => {
    setURL(event.target.value);
  };

  return (
    <Box sx={{ minHeight: "70vh" }}>
      <h2>Image Verification</h2>
      <Box sx={{ display: "flex", my: "2rem" }}>
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
      {loading ? <CircularProgress color="inherit" size={20} /> : null}
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
    </Box>
  );
};

export default ImageVerification;
