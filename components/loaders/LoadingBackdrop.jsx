import { Backdrop, CircularProgress, Stack } from "@mui/material";
import { useResolutioBackdropContext } from "../../context/ResolutioBackdropContext";

const LoadingBackdrop = () => {
  const { backdropOpen, backdropMsg } = useResolutioBackdropContext();
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={backdropOpen}
    >
      <Stack spacing={2} alignItems="center">
        {backdropMsg}
        <CircularProgress color="primary" />
      </Stack>
    </Backdrop>
  );
};

export default LoadingBackdrop;
