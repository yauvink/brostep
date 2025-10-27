import { Box } from "@mui/material";
import SearchAnimationUserCard from "./SearchAnimationUserCard";
import type { GameUser } from "../../../providers/GameProvider/GameProvider";

function SearchAnimation({
  usersToDisplay,
  onAnimationEnd,
}: {
  usersToDisplay: GameUser[];
  onAnimationEnd: () => void;
}) {
  const CARD_SIZE = 150;

  return (
    <Box
      sx={{
        position: "absolute",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 200000,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
      }}
    >
      <Box
        sx={{
          // border: "10px solid blue",
          width: "100%",
          height: "200px",
          display: "flex",
          // backgroundColor: "white",
          // border: "1px solid red",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            height: "200px",
            width: "150px",
            // border: "1px solid blue",
          }}
        >
          <Box>
            <svg
              width="40"
              height="30"
              viewBox="0 0 40 30"
              style={{ display: "block", margin: "0 auto" }}
            >
              <polygon points="20,25 5,5 35,5" fill="red" />
            </svg>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              animation:
                "slideToDetected 7s cubic-bezier(0.1, 0.8, 0.3, 1) forwards",
              animationFillMode: "forwards",
            }}
            onAnimationEnd={onAnimationEnd}
          >
            {usersToDisplay.map((user, i) => (
              <SearchAnimationUserCard
                key={i}
                user={user}
                cardSize={CARD_SIZE}
              />
            ))}
          </Box>
          <Box
            sx={{
              transform: "rotate(180deg)",
            }}
          >
            <svg
              width="40"
              height="30"
              viewBox="0 0 40 30"
              style={{ display: "block", margin: "0 auto" }}
            >
              <polygon points="20,25 5,5 35,5" fill="red" />
            </svg>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default SearchAnimation;
