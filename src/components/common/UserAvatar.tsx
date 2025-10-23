import { Box, Avatar, Typography, Tooltip } from "@mui/material";
import { Person } from "@mui/icons-material";
import type { GameUser } from "../../providers/GameProvider/GameProvider";
import InfoIcon from "@mui/icons-material/Info";
import {
  getLevelColorByLevel,
  getUserLevelByScore,
} from "../../constants/app.constants";
import { useState } from "react";
import UserTooltip from "./UserTooltip";

function UserAvatar({ user }: { user: GameUser }) {
  const size = 70;
  const [open, setOpen] = useState(false);

  const level = getUserLevelByScore(user.interactions);
  const color = getLevelColorByLevel(level);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Tooltip
      open={open}
      onClose={handleClose}
      title={<UserTooltip user={user} />}
      arrow
      disableHoverListener={false}
      disableFocusListener
      disableTouchListener
    >
      <Box
        onClick={handleClick}
        sx={{
          // border: '1px solid red',
          width: `${size}px`,
          minHeight: `${size}px`,
          display: "flex",
          flexDirection: "column",
          cursor: "pointer",
        }}
      >
        <Typography
          sx={{
            // border: '1px solid red',
            zIndex: 9,
            position: "absolute",
            bottom: "-5px",
            left: "50%",
            transform: "translateX(-50%)",
            color: "white",
            textShadow: "1px 1px 2px black, 0 0 1em black, 0 0 0.2em black",
            lineHeight: "14px",
            span: {
              color: color,
            },
          }}
        >
          {user.firstName} <span>Lvl {level}</span>
        </Typography>

        {user?.photoUrl ? (
          <Avatar
            src={user.photoUrl}
            alt="Profile"
            sx={{
              backgroundColor: "white",
              width: size,
              height: size,
              boxShadow: user.isOnline ? "0 0 10px 0 green" : "0 0 10px 0 grey",
              border: user.isOnline ? "4px solid green" : "4px solid grey",
              borderRadius: "50%",
            }}
          />
        ) : (
          <Box
            sx={{
              width: size,
              height: size,
              backgroundColor: "white",
              boxShadow: user.isOnline ? "0 0 10px 0 green" : "0 0 10px 0 grey",
              borderRadius: "50%",
              border: user.isOnline ? "4px solid green" : "4px solid grey",
            }}
          >
            <Person sx={{ color: "black", width: size, height: size }} />
          </Box>
        )}
        <Box
          sx={{
            position: "absolute",
            transform: "translate(-20%, -20%)",
            top: 0,
            border: user.isOnline ? "4px solid green" : "4px solid grey",
            backgroundColor: "#fff",
            borderRadius: "50%",
            width: "30px",
            height: "30px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "4px",
            color: "black",
          }}
        >
          {user.count}
        </Box>

        <Box
          sx={{
            position: "absolute",
            transform: "translate(20%, -20%)",
            top: 0,
            right: 0,
            backgroundColor: "black",
            borderRadius: "50%",
            width: "30px",
            height: "30px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
          }}
        >
          <InfoIcon sx={{ width: "30px", height: "30px" }} />
        </Box>
      </Box>
    </Tooltip>
  );
}
export default UserAvatar;
