import { Box, Typography } from "@mui/material";
import Image from "next/image";
import masterLogo from "../../public/master_logo.svg";

const BrandHeading = () => {
  return (
    <Box sx={{ textAlign: "center" }}>
      <Image
        src={masterLogo}
        alt="Resolutio logo"
        height={200}
        width={200}
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOMd66vBwADzAGiDaTe+gAAAABJRU5ErkJggg=="
      />
      <Typography variant="h1" color="primary">
        Brand Guidelines {new Date().getFullYear()}
      </Typography>
    </Box>
  );
};

export default BrandHeading;
