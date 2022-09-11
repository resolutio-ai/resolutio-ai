import { Box } from "@mui/material";
import BrandColorPalette from "../components/branding/BrandColorPalette";
import BrandHeading from "../components/branding/BrandHeading";
import BrandIdentity from "../components/branding/BrandIdentity";
import BrandLogo from "../components/branding/BrandLogo";
import BrandLogoOnColor from "../components/branding/BrandLogoOnColor";
import BrandLogoVariants from "../components/branding/BrandLogoVariants";
import BrandTypographyColor from "../components/branding/BrandTypographyColor";
import Meta from "../components/seo/Meta";

const LogoBrandGuidelines = () => {
  return (
    <>
      <Meta title="Resolutio Logo and Brand Guidelines" />
      <Box sx={{ my: 4 }}>
        <BrandHeading />
        <BrandIdentity />
        <BrandLogo />
        <BrandLogoVariants />
        <BrandColorPalette />
        <BrandTypographyColor />
        <BrandLogoOnColor />
      </Box>
    </>
  );
};

export default LogoBrandGuidelines;
