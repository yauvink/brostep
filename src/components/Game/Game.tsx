import { Box } from "@mui/material";
import TouchButton from "./components/TouchButton";
import Users from "./components/Users/Users";
import ChatMessages from "./components/ChatMessages";
import ConnectionOverlay from "./components/ConnectionOverlay";
import NavBar from "./components/NavBar";
import AddGame from "../AddGame";
import { useState, memo } from "react";
import SpinnerAnimation from "../common/SpinnerAnimation";
import Leaderboard from "./components/Leaderboard/Leaderboard";
import Menu from "./components/Menu/Menu";
import SuccessPaymentModal from "../common/SuccessPaymentModal";

function Game() {
  const [isAddGameOpen, setIsAddGameOpen] = useState(false);
  const [successPaymentModalOpen, setSuccessPaymentModalOpen] = useState(false);

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "white",
        position: "relative",
        // border: '1px solid red',
      }}
    >
      {isAddGameOpen && (
        <AddGame
          onClose={() => setIsAddGameOpen(false)}
          setSuccessPaymentModalOpen={setSuccessPaymentModalOpen}
        />
      )}
      <SuccessPaymentModal
        open={successPaymentModalOpen}
        onClose={() => setSuccessPaymentModalOpen(false)}
      />

      <ConnectionOverlay />

      <Box
        sx={{
          flexGrow: 1,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          // justifyContent: 'flex-end',
          justifyContent: "center",
          padding: "72px 0px 10px",
          // border: '1px solid blue',
        }}
      >
        <NavBar onAddGame={() => setIsAddGameOpen(true)} />
        <Box
          sx={{
            // border: '1px solid white',
            borderRadius: "50%",
            width: "100%",
            flexGrow: 1,
            backgroundColor: "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <Leaderboard />
          <Menu />

          <TouchButton />
          <SpinnerAnimation />
          <Users />
        </Box>
      </Box>
      <ChatMessages />
    </Box>
  );
}

export default memo(Game);
