import { Box, Container, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import BookCalendar from "./BookCalendar";
import SocialLinks from "./SocialLinks";

const AppFooter = () => {
  const [year] = useState(new Date().getFullYear());
  const theme = useTheme();
  const { palette } = theme;
  return (
    <Box
      component="footer"
      sx={{
        // background: `linear-gradient(90deg, ${palette.secondary.dark} 0%, ${palette.primary.dark} 100%)`,
        backgroundColor: '#5f437f'
      }}
    >
      <Container className="footer">
        <SocialLinks />
        <BookCalendar />
        <Box
          sx={{ textAlign: "center", borderTop: "solid 1px #e5e8eb40", p: 3 }}
        >
          <Typography
            variant="caption"
            sx={{ color: palette.primary.contrastText }}
          >
            resolutio © Copyright {year}. All Rights Reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default AppFooter;
