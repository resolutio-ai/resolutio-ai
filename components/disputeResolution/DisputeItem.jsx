import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Link from "next/link";

const DisputeItem = ({ dispute, openStakeDialog }) => {
  return (
    <Link
      href={dispute.isStakeTimeExpired ? "/dispute-details/123" : ""}
      passHref
    >
      <Card
        sx={{
          minWidth: 275,
          p: 2,
          cursor: dispute.isStakeTimeExpired ? "pointer" : "default",
        }}
      >
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {dispute.title}
          </Typography>
          <Typography component="div">{dispute.description}</Typography>
        </CardContent>
        <CardActions>
          {!dispute.isStakeTimeExpired && (
            <>
              <Button
                variant="contained"
                sx={{ mr: 2 }}
                onClick={openStakeDialog}
              >
                stake
              </Button>
              <AccessAlarmIcon />
            </>
          )}
        </CardActions>
      </Card>
    </Link>
  );
};

export default DisputeItem;
