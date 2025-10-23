import { Box, Button } from "@mui/material";
import { useGame } from "../../../providers/GameProvider";
import { useEffect, useRef, useState } from "react";

function NavBar({ onAddGame }: { onAddGame: () => void }) {
  const { rooms, setSelectedGameRoom, selectedGameRoom } = useGame();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToRoom = (roomId: string) => {
    const roomElement = document.getElementById(`room-${roomId}`);
    if (roomElement && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const containerRect = container.getBoundingClientRect();
      const buttonRect = roomElement.getBoundingClientRect();

      // Calculate the scroll position to center the button
      const scrollLeft =
        roomElement.offsetLeft - containerRect.width / 2 + buttonRect.width / 2;

      container.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      });
    }
  };

  const handleTabClick = (tabValue: string) => {
    setSelectedGameRoom(tabValue);
    scrollToRoom(tabValue);
  };

  useEffect(() => {
    if (selectedGameRoom && isFirstLoad && rooms.length > 0) {
      setIsFirstLoad(false);
      scrollToRoom(selectedGameRoom);
    }
  }, [rooms, selectedGameRoom, isFirstLoad]);

  return (
    <Box
      sx={{
        // border: "1px solid red",
        width: "100%",
        position: "relative",
        zIndex: 1000,
        backgroundColor: "rgba(255,255,255,0.4)",
      }}
    >
      <Box
        ref={scrollContainerRef}
        sx={{
          display: "flex",
          gap: "10px",
          padding: "10px 20px",
          overflowX: "auto",
          transform: "rotateX(180deg)",
          "& > *": {
            transform: "rotateX(180deg)",
          },
        }}
      >
        <Button
          onClick={onAddGame}
          variant={"contained"}
          sx={{
            minWidth: "max-content",
            backgroundColor: "green",
          }}
        >
          Add +
        </Button>
        {rooms.map((room) => (
          <Button
            key={room.id}
            id={`room-${room.id}`}
            variant={selectedGameRoom === room.id ? "contained" : "outlined"}
            onClick={() => handleTabClick(room.id)}
            sx={{
              minWidth: "max-content",
            }}
          >
            {room.chatTitle}
          </Button>
        ))}
      </Box>
    </Box>
  );
}

export default NavBar;
