import { Box, Grid, Typography } from "@mui/material";
import { NO_IMAGE_SEARCH } from "../../constants/strings";
import ImageItem from "./ImageItem";

const SimilarImageList = ({ images, isEmptySearch }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={4}>
        {images?.map((item, index) => (
          <Grid item xs={6} sm={4} md={3} key={index}>
            <ImageItem item={item} />
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
