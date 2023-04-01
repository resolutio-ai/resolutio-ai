import { Backdrop, Stack, Typography, useTheme } from "@mui/material";
import { HashLoader } from "react-spinners";
import { useResolutioBackdropContext } from "../../context/ResolutioBackdropContext";
const LoadingBackdrop = () => {
  const theme = useTheme();
  const { backdropOpen, backdropMsg } = useResolutioBackdropContext();

  return (
    <Backdrop
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={backdropOpen}
    >
      <Stack spacing={2} alignItems="center">
        <HashLoader color={theme.palette.primary.dark} />
        <Typography variant="body1" sx={{ color: "white" }}>
          {backdropMsg}
        </Typography>
      </Stack>
    </Backdrop>
  );
};

export default LoadingBackdrop;
