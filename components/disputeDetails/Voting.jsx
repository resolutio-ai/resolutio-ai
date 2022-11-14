import { Box, Button, Typography } from "@mui/material";
/* import CountDownTimer from "../../components/CountDownTimer"; */

const Voting = ({ handleInvalidate, handleValidate }) => {
  return (
    <Box>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h1">VOTE</Typography>
        {/* <CountDownTimer expiryTimestamp={1656530040208} /> */}
        <Box>
          <Button
            variant="contained"
            color="secondary"
            sx={{ mr: 4 }}
            onClick={handleInvalidate}
          >
            Invalidate NFT
          </Button>
          <Button variant="contained" color="primary" onClick={handleValidate}>
            Validate NFT
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Voting;
