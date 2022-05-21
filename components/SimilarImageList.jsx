import { Box, Grid, ImageListItemBar, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import { NO_IMAGE_SEARCH, START_IMAGE_SEARCH } from "../constants/strings";

const SimilarImageList = ({ images, isSearch }) => {
  console.log(images);
  return (
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
      {!isSearch &&
        <Typography variant="body1" fontWeight="bold" paddingTop={3}>
          {START_IMAGE_SEARCH}
        </Typography>
      }
      {!!!images.length && isSearch &&
        <Typography variant="body1" fontWeight="bold" paddingTop={3}>
          {NO_IMAGE_SEARCH}
        </Typography>}
    </Box>
  );
};

export default SimilarImageList;
