import { Box, Stack, Typography } from "@mui/material";
import {
  primaryDark,
  primaryLight,
  primaryMain,
  PrimaryYellow,
  secondaryCream,
  secondaryDark,
  secondaryLight,
  secondaryMain,
} from "../../styles/colors";

const BrandColorPalette = () => {
  const primaryColors = [
    { name: "Victoria", hex: primaryDark },
    { name: "Deluge", hex: primaryMain },
    { name: "Logan", hex: primaryLight },
    { name: "Cheddar", hex: PrimaryYellow },
  ];
  const secondaryColors = [
    { name: "Vin Rogue", hex: secondaryDark },
    { name: "Terracota", hex: secondaryMain },
    { name: "Tacha", hex: secondaryLight },
    { name: "Pancho", hex: secondaryCream },
  ];
  return (
    <Box>
      <Typography variant="h2">Brand Colour Palette</Typography>
      <Stack direction="row" justifyContent="space-between">
        <Box sx={{ flex: "1 1 40%" }}>
          <p>Resolutio brand palette includes primary and secondary colours.</p>
          <p>
            Both print and digital layouts should consist of mainly primary
            colours, 70-100% of the overall design, and if you’d like to add
            secondary colours please no more than 10-30% of the overall design.
            Communications should never be created without the primary colours.
          </p>
        </Box>
        <Stack
          direction="row"
          sx={{ flex: "1 1 60%" }}
          justifyContent="space-between"
        >
          <Box>
            <Typography variant="h6">Primary Colour Palette</Typography>
            <Box>
              {primaryColors.map((color, index) => {
                return <Box key={index}>{color.name}</Box>;
              })}
            </Box>
          </Box>
          <Box>
            <Typography variant="h6">Secondary Colour Palette</Typography>
            <Box>
              {secondaryColors.map((color, index) => {
                return <Box key={index}>{color.name}</Box>;
              })}
            </Box>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};

export default BrandColorPalette;
