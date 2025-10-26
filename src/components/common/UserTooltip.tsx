import { Box, LinearProgress, Typography } from "@mui/material";
import type { GameUser } from "../../providers/GameProvider/GameProvider";
import {
  getLevelColorByLevel,
  getLevelNameByLevel,
  getNextLevelInteractions,
  getUserLevelByScore,
} from "../../constants/app.constants";
import UserMarks from "./UserMarks";
import { useMemo } from "react";

export default function UserTooltip({ user }: { user: GameUser }) {
  const level = getUserLevelByScore(user.interactions);

  const levelName = getLevelNameByLevel(level);
  const nextLevelName = getLevelNameByLevel(level + 1);
  const color = getLevelColorByLevel(level);
  const nextLevelColor = getLevelColorByLevel(level + 1);

  const luckyPercent =
    user.interactions > 0
      ? Math.round((user.luckyInteractions / user.interactions) * 100)
      : 0;

  const nextLevelInteractions = useMemo(() => {
    return getNextLevelInteractions(level);
  }, [level]);

  const progress = useMemo(() => {
    return (user.interactions / nextLevelInteractions) * 100;
  }, [user, level]);

  return (
    <Box
      sx={{
        p: 1,
        backgroundColor: "white",
        borderRadius: "5px",
        minWidth: "250px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        {user.photoUrl && (
          <img
            src={user.photoUrl}
            alt="Profile"
            style={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              objectFit: "cover",
              border: "3px solid rgba(0,0,0,0.1)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            }}
          />
        )}
        <Box>
          <Typography sx={{ color: "#333", fontWeight: "bold" }}>
            {user.firstName} {user.lastName}
          </Typography>
          <Typography sx={{ color: color }}>
            Level: {level} - {levelName}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          mt: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            ".MuiLinearProgress-bar": {
              backgroundColor: color,
            },
          }}
        >
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              color: "green",
              backgroundColor: `${color}20`,
              // opacity: 0.5,
              height: 30,
              borderRadius: 1,
            }}
          />
        </Box>
        <Typography
          sx={{
            position: "absolute",
            color: "black",
            fontWeight: 700,
          }}
        >
          {user.interactions}/{nextLevelInteractions}
        </Typography>
      </Box>
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: "10px",
          mb: "0px",
          width: "100%",
          textAlign: "right",
          color: nextLevelColor,
        }}
      >
        Next level: {level + 1} - {nextLevelName}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          mt: "10px",
        }}
      >
        <Typography
          sx={{
            color: "black",
          }}
        >
          Pidor Score: {user.count}
        </Typography>
        <Typography
          sx={{
            color: "black",
          }}
        >
          Searches: {user.interactions}
        </Typography>
        <Typography
          sx={{
            color: "black",
          }}
        >
          Lucky Searches: {user.luckyInteractions}
        </Typography>
        <Typography
          sx={{
            color: "black",
          }}
        >
          Lucky: {luckyPercent}%
        </Typography>
      </Box>
      <Box
        sx={{
          mt: "10px",
        }}
      >
        <UserMarks user={user} />
      </Box>
    </Box>
  );
}
