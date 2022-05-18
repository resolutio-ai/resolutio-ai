import { Box, Grid, ImageListItemBar } from "@mui/material";
import Image from "next/image";
import React from "react";

const SimilarImageList = ({ images }) => {
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
    </Box>
  );
};

export default SimilarImageList;
