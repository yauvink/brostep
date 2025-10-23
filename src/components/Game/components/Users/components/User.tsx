import { Box } from "@mui/material";
import UserAvatar from "../../../../common/UserAvatar";
import type { GameUser } from "../../../../../providers/GameProvider/GameProvider";
import ScoreChangeAnimation from "./ScoreChangeAnimation";
import { memo } from "react";
import UserMarks from "../../../../common/UserMarks";

function User({ user, x, y }: { user: GameUser; x: number; y: number }) {
  return (
    <Box
      sx={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
        zIndex: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
      }}
    >
      <UserAvatar user={user} />

      {/* <UserMarks user={user} /> */}

      <ScoreChangeAnimation currentUser={user} />
    </Box>
  );
}

export default memo(User);
