import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";
import { NO_IMAGE_SEARCH } from "../constants/strings";

const SimilarImageList = ({ images, isEmptySearch }) => {
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
            <Box>
              <Typography variant="body1">{`Similarity: ${item.similarity}`}</Typography>
              <Typography variant="body2">{`Chain: ${item.chain}`}</Typography>
              <Typography variant="body2">{`Asset ID: ${item.token_id}`}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
      {isEmptySearch && (
        <Typography variant="body1" fontWeight="bold" paddingTop={3}>
          {NO_IMAGE_SEARCH}
        </Typography>
      )}
    </Box>
  );
};

export default SimilarImageList;
