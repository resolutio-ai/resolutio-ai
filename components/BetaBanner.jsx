import { Box } from "@mui/material";
import React from "react";

function BetaBanner() {
  return (
    <Box
      sx={{
        fontSize: "1rem",
        background: "#EE8E4A",
        px: ".75rem",
        py: ".1rem",
        textTransform: "uppercase",
        ml: ".25rem",
        borderRadius: "1rem",
      }}
      component="sup"
    >
      Beta
    </Box>
  );
}

export default BetaBanner;
