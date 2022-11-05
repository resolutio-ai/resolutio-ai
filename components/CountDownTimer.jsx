import { Box } from "@mui/material";
import { useTimer } from "react-timer-hook";

const CountDownTimer = ({ expiryTimestamp }) => {
  const { seconds, minutes, hours, days, isRunning } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called"),
  });
  return (
    <>
      {isRunning && (
        <Box sx={{ textAlign: "center", mb: 1 }}>
          <Box sx={{ fontSize: "1rem" }}>
            <span>{`${days} days : ${hours} hours: ${minutes} minutes: ${seconds} seconds`}</span>
          </Box>
        </Box>
      )}
    </>
  );
};

export default CountDownTimer;
