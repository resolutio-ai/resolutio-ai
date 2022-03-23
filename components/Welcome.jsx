import {
  Avatar,
  Box,
  Button,
  Container,
  Typography,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import BalanceIcon from '@mui/icons-material/Balance';
import ForumIcon from '@mui/icons-material/Forum';
import React from "react";
import Scroll from "../public/icons8-scroll.svg";
import { AddBox } from "@mui/icons-material";
import Link from "next/link";

const useStyles = (theme) => ({
  logostyles: {
    textDecoration: "none",
    color: theme.palette.primary.main,
    fontSize: 220
  },
  textLine: {
    color: theme.palette.primary.contrastText,
  },
  iconStyle: {
    display: 'flex', flexDirection: 'column', textAlign: 'center'
  },
  iconText: {
    color: theme.text.primary,
  },
});
const Welcome = () => {

  const theme = useTheme();
  const styles = useStyles(theme);

  return (
    <Box>
      <h2>Welcome</h2>
      <Box fontSize="200px" sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Link href="#res-ed" passHref>
          <Button sx={styles.iconStyle}>
            <Image sx={styles.logostyles} src={Scroll} alt="Res Ed"
              width={200}
              height={200} />
            <Typography sx={styles.iconText}>
              Res Ed
            </Typography>
          </Button>
        </Link>
        <Link href="#justice" passHref>
          <Button sx={styles.iconStyle} >
            <BalanceIcon sx={styles.logostyles} fontSize="inherit"  />
            <Typography sx={styles.iconText}>
              Art theft
            </Typography>
          </Button>
        </Link>
        <Link href="#community" passHref>
          <Button sx={styles.iconStyle}>
            <ForumIcon sx={styles.logostyles} fontSize="inherit" />
            <Typography sx={styles.iconText}>
              Join our community
            </Typography>
          </Button>

        </Link>
      </Box>
    </Box>
  )
}

export default Welcome;