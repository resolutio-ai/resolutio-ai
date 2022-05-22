import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import {
  READ_MORE_BUTTON_LABEL,
  RESED_SECTION_DESC,
  RESED_SECTION_HEADING,
} from "../constants/strings";
import articles from "../data/mediumArticles.json";

const ResEd = () => {
  return (
    <Box sx={{ textAlign: "center", mt: 12 }}>
      <Typography variant="h5">{RESED_SECTION_HEADING}</Typography>
      <Typography variant="body1">{RESED_SECTION_DESC}</Typography>
      <Box sx={{ py: 4 }}>
        <Grid container spacing={2}>
          {articles.map((article) => {
            return (
              <Grid
                item
                sm={4}
                xs={12}
                key={article.id}
                sx={{ display: "flex", textDecoration: "none" }}
                component="a"
                href={article.link}
                target="_blank"
              >
                <Card>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image={article.imageURL}
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div">
                        {article.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {article.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
      <Button
        variant="outlined"
        target="_blank"
        href="https://medium.com/resolutio-nft"
      >
        {READ_MORE_BUTTON_LABEL}
      </Button>
    </Box>
  );
};

export default ResEd;
