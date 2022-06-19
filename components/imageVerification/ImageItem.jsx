import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Link from "next/link";

const ImageItem = ({ item }) => {
  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          height="275"
          image={item.cached_file_url}
          alt={item.title}
        />
        <CardContent>
          <Box>
            <Typography variant="body1">{`Similarity: ${item.similarity.toPrecision(
              10
            )}`}</Typography>
            <Typography variant="body2">{`Chain: ${item.chain}`}</Typography>
            <Typography variant="body2">{`Asset ID: ${item.token_id}`}</Typography>
          </Box>
        </CardContent>
        <Box
          className="hidden-area"
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            transition: "all 0.5s ease-in-out",
          }}
        >
          <Link href="/initiate-dispute" passHref>
            <Button
              variant="contained"
              fullWidth
              sx={{
                borderRadius: "0 0 4px 4px",
                height: "40px",
              }}
            >
              Raise Dispute
            </Button>
          </Link>
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default ImageItem;
