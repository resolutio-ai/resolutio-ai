import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import React from "react";

const useStyles = (theme) => ({
  textLine: {
    color: theme.palette.primary.contrastText,
    my: 1,
  },
  iconStyle: {
    color: theme.palette.primary.contrastText,
  },
});

const BookCalendar = () => {
  const theme = useTheme();
  const styles = useStyles(theme);

  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="body1" sx={styles.textLine} fontWeight="bold">
        Want to learn more ? set up a call with us
      </Typography>
      <a href="https://calendly.com/resolutio" target="_blank" rel="noreferrer">
        <IconButton color="primary">
          <CalendarMonthIcon sx={styles.textLine} fontSize="large" />
        </IconButton>
      </a>
    </Box>
  );
};

export default BookCalendar;
