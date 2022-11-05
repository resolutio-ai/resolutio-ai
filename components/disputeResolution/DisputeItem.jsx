import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Link from "next/link";

const DisputeItem = ({ dispute }) => {
  return (
    <Card
      sx={{
        minWidth: 275,
        p: 2,
      }}
    >
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {`Dispute ${dispute.disputeId._hex}`}
        </Typography>
        <Typography component="div">{dispute.description}</Typography>
      </CardContent>
      <CardActions>
        <>
          <Link href={`/dispute-details/${dispute.disputeId._hex}`} passHref>
            <Button variant="contained" sx={{ mr: 2 }}>
              View Details
            </Button>
          </Link>
        </>
      </CardActions>
    </Card>
  );
};

export default DisputeItem;
