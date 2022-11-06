import { Backdrop, CircularProgress, Stack } from "@mui/material";

const BackdropLoader = ({
  open,
  msg = "Hold on tight!, while things are loading...",
}) => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <Stack spacing={2} alignItems="center">
        {msg}
        <CircularProgress color="primary" />
      </Stack>
    </Backdrop>
  );
};

export default BackdropLoader;
