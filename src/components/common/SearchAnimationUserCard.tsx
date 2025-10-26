import { Avatar, Box, Typography } from "@mui/material";
import type { GameUser } from "../../providers/GameProvider/GameProvider";
import {
  getLevelColorByLevel,
  getUserLevelByScore,
} from "../../constants/app.constants";

function SearchAnimationUserCard({
  user,
  cardSize,
}: {
  user: GameUser;
  cardSize: number;
}) {
  const padding = 20;
  const level = getUserLevelByScore(user.interactions);
  const color = getLevelColorByLevel(level);

  return (
    <Box
      sx={{
        padding: "20px",
        width: cardSize,
        height: cardSize,
        minWidth: cardSize,
        minHeight: cardSize,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "5px",
      }}
    >
      <Avatar
        src={user.photoUrl ?? undefined}
        alt="Profile"
        sx={{
          backgroundColor: "lightgrey",
          width: cardSize - padding * 2,
          height: cardSize - padding * 2,
          borderRadius: "50%",
        }}
      />
      <Typography
        sx={{
          color: "white",
          lineHeight: "20px",
          fontSize: "20px",
          fontWeight: "bold",
          span: {
            color: color,
          },
        }}
      >
        {user.firstName}
        <br /> <span>Lvl {level}</span>
      </Typography>
    </Box>
  );
}

export default SearchAnimationUserCard;
