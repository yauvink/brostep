import { Box, Avatar, Typography } from "@mui/material";
import { Person } from "@mui/icons-material";
import type { GameUser } from "../../providers/GameProvider/GameProvider";
import InfoIcon from "@mui/icons-material/Info";
import {
  getLevelNameByLevel,
  getUserLevelByScore,
} from "../../constants/app.constants";
function UserAvatar({ user }: { user: GameUser }) {
  const size = 70;

  const level = getUserLevelByScore(user.interactions);
  const levelName = getLevelNameByLevel(level);

  return (
    <Box
      sx={{
        // border: '1px solid red',
        width: `${size}px`,
        minHeight: `${size}px`,
        display: "flex",
        flexDirection: "column",
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
        }}
      >
        {user.firstName} Lvl {level}
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
  );
}
export default UserAvatar;
