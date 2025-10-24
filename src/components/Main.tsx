import { memo } from "react";
import { Box } from "@mui/material";
import { useApp } from "../providers/AppProvider";
import AppHeader from "./common/AppHeader";
import Game from "./Game/Game";
import background from "../assets/bg_3.jpg";

function Main() {
  const { authState } = useApp();

  if (authState.isLoading) {
    return (
      <div className="loading-screen">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <AppHeader />
      <Game />
    </Box>
  );
}

export default memo(Main);
