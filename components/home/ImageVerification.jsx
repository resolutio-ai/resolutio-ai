import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import { IMAGE_VERIFICATION_HEADING } from "../../constants/strings";
import BetaBanner from "../BetaBanner";

const ImageVerification = () => {
  return (
    <>
      <Box
        sx={{
          textAlign: "center",
          my: "2rem",
          border: "solid 2px #7c63a0",
          padding: "25px",
          borderRadius: "15px",
          boxShadow: "4px 5px #ccc",
        }}
      >
        <Typography variant="h5">
          {IMAGE_VERIFICATION_HEADING}
          <BetaBanner />
        </Typography>
        <Typography variant="body1">
          Verify whether your art has been tokenized or your NFT duplicated
          without consent on <b>Ethereum</b>, <b>Polygon</b> or <b>Tezos</b>.
        </Typography>
        <Link href="/image-verification" passHref>
          <Button variant="outlined" sx={{ mt: "1rem" }}>
            VERIFY NOW
          </Button>
        </Link>
      </Box>
    </>
  );
};

export default ImageVerification;
