import { Box, Typography } from "@mui/material";
import { useMemo } from "react";

const DisputeInfomation = ({ dispute }) => {
  const disputeInfo = useMemo(
    () => [
      { label: "Victim", value: dispute.creator },
      { label: "NFT ID", value: dispute.additionalDetails?.nftID ?? "" },
      {
        label: "NFT URL",
        value: dispute.additionalDetails?.nftURL ?? "",
      },
      {
        label: "Marketplace",
        value: dispute.additionalDetails?.marketplace ?? "",
      },

      {
        label: "Information",
        value: dispute.additionalDetails?.info ?? "",
      },

      {
        label: "Subject",
        value: dispute.additionalDetails?.subject ?? "",
      },

      {
        label: "Details",
        value: dispute.additionalDetails?.details ?? "",
      },

      {
        label: "Additional Information",
        value: dispute.additionalDetails?.additionalInfo ?? "",
      },
      {
        label: "Number of Attached Files",
        value: dispute.additionalDetails?.attachedFiles ?? "",
      },
    ],
    [dispute]
  );

  return (
    <Box sx={{ marginRight: '5rem' }}>
      <Typography
        variant="h1"
        sx={{ textAlign: "center" }}
      >{`Case Id: ${dispute.disputeId}`}</Typography>
      <Box>
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          {dispute.description}
        </Typography>
        {disputeInfo.map((info, index) => {
          return (
            <Typography variant="body1" sx={{ mt: 2 }} key={index}>
              <strong>{`${info.label}: `}</strong>
              {info.value}
            </Typography>
          );
        })}
      </Box>
    </Box>
  );
};

export default DisputeInfomation;
