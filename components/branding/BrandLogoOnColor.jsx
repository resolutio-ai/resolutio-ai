import { Box, Typography } from "@mui/material";
import Image from "next/image";
import logoOnPrimary from "../../public/logo_on_primary_color.png";
import logoOnSecondary from "../../public/logo_on_secondary_color.png";

const BrandLogoOnColor = () => {
  return (
    <Box>
      <Typography variant="h2">Logo on Color</Typography>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ textTransform: "uppercase" }}>
          Primary colour palette
        </Typography>
        <p>
          While using the logo on coloured backgrounds, our main aim is to make
          sure that none of the elements of the logo drowns (disappears or
          reduces our ability to see it clearly).
        </p>
        <p>
          While using the logo in the solid primary colour, use the full white
          version of the logo. You can also use the white with the yellow dot
          logo on colours that don’t drown the yellow dot.
        </p>
        <p>
          The placements below are acceptable except for the ones within the red
          circle. In the encircled logo on the purple background the logo is not
          standing out and in the encircled one in the yellow background, the
          yellow dot disappears.
        </p>
        <Box sx={{ textAlign: "center" }}>
          <Image
            src={logoOnPrimary}
            alt="Resolutio logo on Primary colors"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOMd66vBwADzAGiDaTe+gAAAABJRU5ErkJggg=="
          />
        </Box>
      </Box>
      <Box>
        <Typography variant="h3" sx={{ textTransform: "uppercase" }}>
          Secondary colour palette
        </Typography>
        <p>
          The placements below are acceptable except for the ones within the red
          circle.
        </p>
        <Box sx={{ textAlign: "center" }}>
          <Image
            src={logoOnSecondary}
            alt="Resolutio logo on Secondary colors"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOMd66vBwADzAGiDaTe+gAAAABJRU5ErkJggg=="
          />
        </Box>
      </Box>
    </Box>
  );
};

export default BrandLogoOnColor;
