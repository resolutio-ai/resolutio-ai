import { Box, Button, Grid, Paper, Stack, TextField, Typography, useTheme } from "@mui/material";
import React from "react";
import { useResolutioContext } from "../context/ResolutioContext";
import ArbiterNFT from "../integrations/ArbiterNFT";
import { useState } from "react";
import styled from "@emotion/styled";
import AddIcon from '@mui/icons-material/Add';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import { getContractOwner, transferOwnership } from "../integrations/VerifyArbiter";
import DisputePool from "../integrations/DisputePool";
import DisputeNFT from "../integrations/DisputeNFT";

const useStyles = (theme) => ({
  textLine: {
    color: theme.palette.primary.contrastText,
    my: 1,
  },
  iconStyle: {
    color: theme.palette.primary.contrastText,
  },
});
const Item = styled(Paper)(({ theme }) => ({

}));

const AdminDashboard = () => {
  const theme = useTheme();
  const styles = useStyles(theme);
  const [newUserAddr, setnewUserAddr] = useState('');
  const [newAdmin, setnewAdminAddr] = useState('');
  const { isAdmin } = useResolutioContext();

  async function handleNewUser(event) {
    event.preventDefault();
    console.log('newUserAddr:', newUserAddr);
    // whitelistArbiters();
    try {
      console.log('addr', newUserAddr);
      const adminNFT = new ArbiterNFT();
      // return;
      const data = await adminNFT.addUser(newUserAddr);
      console.log('response', data);

      return data;
    } catch (error) {
      console.error(error);
    }

  }

  async function handleAdminChange(event) {
    event.preventDefault();
    console.log('newAdmin:', newAdmin);
    try {
      console.log('test admin change');
      const arbOwner= await getContractOwner();
      console.log('arbOwner:', arbOwner);
      const res = await transferOwnership(newAdmin);
      console.log('response first', res);
      
      const disputeSystem = new DisputePool();
      const resDispute = await disputeSystem.transferOwnership(newAdmin);
      console.log('resDispute', resDispute);
      
      const disputeNFT = new DisputeNFT();
      const resNFT = await disputeNFT.transferOwnership(newAdmin);
      console.log('response', resNFT);

    } catch (error) {

    }
    setnewAdminAddr('')
  };

  return (
    <Box sx={{ textAlign: "left", marginBottom: '20px' }}>
      {(isAdmin) && (
        <Box>
          <h1>Admin Dashboard</h1>

          <Box sx={{ width: "50vw" }}>
            <h2>Whitelist Arbiters</h2>
            <form onSubmit={handleNewUser} >
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <TextField id="outlined-basic" label="Wallet Address" variant="standard" value={newUserAddr}
                  onInput={e => setnewUserAddr(e.target.value)} />
                <Button type="submit" sx={{ fontSize: '12px', alignItems: 'end' }}>
                  <AddIcon />
                  Add user
                </Button>
              </Box>
            </form>
          </Box>
          <Box>
            <h2>Change Admin</h2>
            <form onSubmit={handleAdminChange} >
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <TextField id="outlined-basic" label="Wallet Address" variant="standard" value={newAdmin}
                  onInput={e => setnewAdminAddr(e.target.value)} />
                <Button type="submit" sx={{ fontSize: '12px', alignItems: 'end' }}>
                  <ChangeCircleIcon />
                  Change Admin
                </Button>
              </Box>
              <h5>*Warning be sure you want to transfer ownership</h5>
            </form>
          </Box>
        </Box>
      )}
      {(!isAdmin) && (
        <Box>
          Page is not accessible for this user
        </Box>
      )}
    </Box>
  );
};

export default AdminDashboard;
