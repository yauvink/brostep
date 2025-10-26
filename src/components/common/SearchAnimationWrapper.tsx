import { useMemo } from "react";
import { useGame } from "../../providers/GameProvider";
import SearchAnimation from "./SearchAnimation";

function SearchAnimationWrapper() {
  const { gameState } = useGame();

  const isSpinning = useMemo(() => {
    return gameState?.currentState === "detecting";
  }, [gameState]);

  const users = useMemo(() => {
    return gameState?.users ?? [];
  }, [gameState?.users]);

  if (users.length === 0 || !isSpinning) return null;

  return <SearchAnimation usersToSearch={users} />;
}

export default SearchAnimationWrapper;
