import { Box, Button, TextField, Typography } from "@mui/material";
/* import CountDownTimer from "../../components/CountDownTimer"; */
import { useCallback, useState } from "react";

const AdminDecision = ({ handleDecision }) => {

  const [mintAmount, setmintAmount] = useState(0);

  const handleInputChange = useCallback(
    (e) => {
      console.log(e.target.value);
      const { value } = e.target;
      setmintAmount(value);
    },
    [setmintAmount]
  );


  const handleAccept = useCallback((e) => {
    console.log(e.target.value);
    const { value } = e.target;
    console.log(mintAmount);
    handleDecision(mintAmount);
  }, [handleDecision, mintAmount]
  );

  const handleDecline = useCallback(() => {
    handleDecision(2);
  }, [handleDecision]);

  return (
    <Box>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>Admin Decision</Typography>
        {/* <CountDownTimer expiryTimestamp={1656530040208} /> */}
        <TextField
          id="mint_amount-input"
          name="mint_amount"
          label="Amount to be minted"
          type="number"
          fullWidth
          value={mintAmount}
          onChange={handleInputChange}
        />
        <Box sx={{ textAlign: "center", mt: 1 }}>
          <Button variant="contained" color="primary" onClick={handleAccept}>
            Mint NFT
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminDecision;
