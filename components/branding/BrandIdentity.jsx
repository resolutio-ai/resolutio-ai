import { Box, Typography } from "@mui/material";

const BrandIdentity = () => {
  return (
    <Box>
      <Typography variant="h2">Brand Identity</Typography>
      <Typography variant="h3" sx={{ textTransform: "uppercase" }}>
        Who we are
      </Typography>
      <p>
        A club/home for NFT Community(artists, collectors, developers) where the
        community collectively owns and operates the platform.
      </p>
      <p>
        Resolutio provides the environment for the Community to come together,
        engage, and uplift themselves, to help each other and protect each other
        from harm. Resolutio provides the resources and tools, and extends help
        to the Community so they can promote and protect each other. [resolutio
        protects, but by helping the community protect themselves]
      </p>
      <Typography variant="h3" sx={{ textTransform: "uppercase" }}>
        What we do
      </Typography>
      <ul className="resolutio">
        <li>Provide tools to identify theft</li>
        <li>Notify people on identifying theft</li>
        <li>Community based dispute resolution to directly tackle theft</li>
        <li>Work with marketplaces to flag bad nfts and tackle theft</li>
        <li>Potentially, offer compensation to victims [future]</li>
        <li>Use technology [AI] to predict theft patterns and prevent it</li>
      </ul>
    </Box>
  );
};

export default BrandIdentity;
