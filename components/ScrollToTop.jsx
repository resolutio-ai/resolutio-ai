import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import {
  Box,
  IconButton,
  Tooltip,
  useScrollTrigger,
  Zoom,
} from "@mui/material";

const useStyles = () => ({
  scrollContainer: {
    position: "fixed",
    bottom: "2rem",
    right: "2rem",
  },
  scrollBtn: {
    border: 1,
  },
});

const ScrollToTop = () => {
  const styles = useStyles();

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleScroll = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };
  return (
    <Zoom in={trigger}>
      <Box sx={styles.scrollContainer}>
        <Tooltip title="Scroll to top">
          <IconButton
            onClick={handleScroll}
            aria-label="scroll back to top"
            color="secondary"
            sx={styles.scrollBtn}
          >
            <ArrowUpwardIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Zoom>
  );
};

export default ScrollToTop;
