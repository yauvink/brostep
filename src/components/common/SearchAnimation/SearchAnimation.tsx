import { Box } from "@mui/material";
import { useMemo } from "react";
import SearchAnimationUserCard from "./SearchAnimationUserCard";
import type { GameUser } from "../../../providers/GameProvider/GameProvider";

function SearchAnimation({ usersToSearch }: { usersToSearch: GameUser[] }) {
  const CARD_SIZE = 150;

  const usersToDisplay = useMemo(() => {
    if (usersToSearch && usersToSearch.length < 50) {
      const result = [];
      for (let i = 0; i < 50; i++) {
        result.push(usersToSearch[i % usersToSearch.length]);
      }
      return result;
    } else {
      return usersToSearch.slice(0, 50);
    }
  }, [usersToSearch]);

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
            width: "300px",
            // border: "1px solid blue",
          }}
        >
          {/* <Box>
            <svg
              width="40"
              height="30"
              viewBox="0 0 40 30"
              style={{ display: "block", margin: "0 auto" }}
            >
              <polygon points="20,25 5,5 35,5" fill="red" />
            </svg>
          </Box> */}
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              animation: "slideLeftPx 10s linear infinite",
            }}
            onAnimationEnd={() => {
              console.log("animation ended");
            }}
          >
            {usersToDisplay?.map((user, i) => (
              <SearchAnimationUserCard
                key={i}
                user={user}
                cardSize={CARD_SIZE}
              />
            ))}
          </Box>
          {/* <Box
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
          </Box> */}
        </Box>
      </Box>
    </Box>
  );
}

export default SearchAnimation;
