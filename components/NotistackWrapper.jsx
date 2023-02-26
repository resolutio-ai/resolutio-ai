import { SnackbarProvider } from "notistack";

const MAX_SNACK = 3;
const AUTO_HIDE_DURATION = 5000;

const POSITION = {
  vertical: "bottom",
  horizontal: "right",
};

const NotistackWrapper = ({ children }) => {
  return (
    <SnackbarProvider
      maxSnack={MAX_SNACK}
      autoHideDuration={AUTO_HIDE_DURATION}
      anchorOrigin={POSITION}
    >
      {children}
    </SnackbarProvider>
  );
};

export default NotistackWrapper;
