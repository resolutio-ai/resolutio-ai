import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import logoLinear from "../../public/logo_linear.jpg";
import logoMark from "../../public/logo_mark.jpg";

const BrandLogoVariants = () => {
  return (
    <Box>
      <Typography variant="h2">Logo Versions</Typography>
      <Stack direction="row" sx={{ my: 8 }}>
        <Box sx={{ flex: "1 1 50%", textAlign: "center" }}>
          <Image
            src={logoLinear}
            alt="Resolutio logo"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOMd66vBwADzAGiDaTe+gAAAABJRU5ErkJggg=="
          />
          <Typography variant="h4">LINEAR/ SECONDARY LOGO</Typography>
          <p>This is our linear/ secondary logo.</p>
          <p>
            Note the horizontal lockup. Use the secondary logo only when the
            master logo doesn’t fit your composition.
          </p>
        </Box>
        <Box sx={{ flex: "1 1 50%", textAlign: "center" }}>
          <Image
            src={logoMark}
            alt="Resolutio logo"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOMd66vBwADzAGiDaTe+gAAAABJRU5ErkJggg=="
          />
          <Typography variant="h4">LOGO MARK</Typography>
          <p>This is our logo mark. Note the absence of the brand name.</p>
          <p>
            this only when the master logo or the secondary logo doesn’t fit
            your composition.
          </p>
          <p>
            While using this version, make sure that the primary logo or the
            brand name ‘resolutio’ is present within the digital/print document.
          </p>
        </Box>
      </Stack>
    </Box>
  );
};

export default BrandLogoVariants;
