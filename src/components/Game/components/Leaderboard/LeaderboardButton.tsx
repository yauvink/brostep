import { Box, IconButton } from "@mui/material";

import LeaderboardIcon from "@mui/icons-material/Leaderboard";

function LeaderboardButton({ onClick }: { onClick: () => void }) {
  return (
    <Box
      sx={{
        position: "absolute",
        top: "10px",
        left: "20px",
        zIndex: 900,
      }}
    >
      <IconButton
        color="inherit"
        onClick={() => {
          onClick();
        }}
        sx={{
          color: "#333",
          padding: 0,
          border: "2px solid rgba(0,0,0,0.5)",
          backgroundColor: "rgba(255,255,255,0.5)",
          width: "50px",
          height: "50px",
          marginRight: "10px",
          "&:hover": {
            backgroundColor: "rgba(0,0,0,0.1)",
          },
        }}
      >
        <LeaderboardIcon />
      </IconButton>
    </Box>
  );
}

export default LeaderboardButton;
