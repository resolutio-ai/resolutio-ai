import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { PLACEHOLDER_BLUR } from "../constants/constants";

const UserCard = ({ user }) => {
  return (
    <Card
      sx={{
        display: "flex",
        flex: "0 0 100%",
        justifyContent: "space-between",
        flexDirection: "column",
      }}
    >
      <CardContent>
        <Image
          src={`/profiles/${user.imgSrc}`}
          alt={user.name}
          width={100}
          height={100}
          objectFit="cover"
          className="rounded"
          placeholder="blur"
          blurDataURL={PLACEHOLDER_BLUR}
        />
        <Typography fontWeight="bold">{user.name}</Typography>
        <Typography variant="body1">{user.title}</Typography>
        <Typography variant="caption">{user.description}</Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>
        <a href={user.social.linkedIn} target="_blank" rel="noreferrer">
          <IconButton color="primary">
            <LinkedInIcon />
          </IconButton>
        </a>
        {user.social.twitter && (
          <a href={user.social.twitter} target="_blank" rel="noreferrer">
            <IconButton color="primary">
              <TwitterIcon />
            </IconButton>
          </a>
        )}
      </CardActions>
    </Card>
  );
};

export default UserCard;
