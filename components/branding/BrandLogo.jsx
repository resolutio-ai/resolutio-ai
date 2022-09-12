import { Box, Typography } from "@mui/material";
import Image from "next/image";
import masterLogo from "../../public/master_logo.svg";

const BrandLogo = () => {
  return (
    <Box>
      <Typography variant="h2">Logo</Typography>
      <p>
        The resolutio logo takes a minimal form of the weighing scale which
        conveys the idea of justice. Each of the elements is structured in such
        a way that together it visually represents an ‘r’. The yellow dot
        pertains to the artistic aspect of the brand. The resolutio logo
        consists of the colours from the primary colour palette of the brand (
        see below: ) the purple shades represent the legal side of the brand
        while the yellow represents the artistic side as mentioned before.
      </p>
      <Box sx={{ textAlign: "center" }}>
        <Box sx={{ my: 4 }}>
          <Image
            src={masterLogo}
            alt="Resolutio logo"
            height={150}
            width={150}
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOMd66vBwADzAGiDaTe+gAAAABJRU5ErkJggg=="
          />
        </Box>
        <Typography variant="h3" sx={{ textTransform: "uppercase", mb: 2 }}>
          Master logo
        </Typography>
        <Typography variant="h4">This is our master logo.</Typography>
        <Typography variant="h5">Note the vertical lockup.</Typography>
      </Box>
    </Box>
  );
};

export default BrandLogo;
