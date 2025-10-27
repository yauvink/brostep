import { useMemo } from "react";
import { useGame } from "../../../providers/GameProvider";
import SearchAnimation from "./SearchAnimation";
import DetectingAnimation from "../../Game/components/DetectingAnimation";
import type { GameUser } from "../../../providers/GameProvider/GameProvider";

function SearchAnimationWrapper() {
  const { gameState, preDetectedUserId, setPreDetectedUserId } = useGame();

  const isDetecting = useMemo(() => {
    return gameState?.currentState === "detecting";
  }, [gameState]);

  function getNextUser(array: GameUser[], index: number) {
    if (array[index]) {
      return array[index];
    } else {
      return array[array.length + index];
    }
  }

  function getPreviousUser(array: GameUser[], index: number) {
    if (index < 0) {
      return array[array.length + ((index % array.length) - 1)];
    }
    return array[index];
  }

  // useEffect(() => {
  //   setTimeout(() => {
  //     setPreDetectedUserId("68dc3ed1af7c6b99f3234b9f");
  //   }, 1000);
  // }, []);

  const handleAnimationEnd = () => {
    setTimeout(() => {
      setPreDetectedUserId(null);
    }, 1000);
  };

  const usersToDisplay = useMemo(() => {
    const allUsers = gameState?.users;

    if (allUsers && preDetectedUserId) {
      const resultArray = [];

      const detectedIndex = allUsers.findIndex(
        (user) => user.id === preDetectedUserId
      );

      if (detectedIndex !== -1) {
        const previousUser1 = getPreviousUser(allUsers, detectedIndex - 1);
        const previousUser2 = getPreviousUser(allUsers, detectedIndex - 2);
        const previousUser3 = getPreviousUser(allUsers, detectedIndex - 3);
        const previousUser4 = getPreviousUser(allUsers, detectedIndex - 4);
        const previousUser5 = getPreviousUser(allUsers, detectedIndex - 5);
        const previousUser6 = getPreviousUser(allUsers, detectedIndex - 6);
        const previousUser7 = getPreviousUser(allUsers, detectedIndex - 7);
        const previousUser8 = getPreviousUser(allUsers, detectedIndex - 8);
        const previousUser9 = getPreviousUser(allUsers, detectedIndex - 9);
        const previousUser10 = getPreviousUser(allUsers, detectedIndex - 10);
        const previousUser11 = getPreviousUser(allUsers, detectedIndex - 11);
        const previousUser12 = getPreviousUser(allUsers, detectedIndex - 12);
        const previousUser13 = getPreviousUser(allUsers, detectedIndex - 13);
        const previousUser14 = getPreviousUser(allUsers, detectedIndex - 14);
        const previousUser15 = getPreviousUser(allUsers, detectedIndex - 15);
        const previousUser16 = getPreviousUser(allUsers, detectedIndex - 16);
        const previousUser17 = getPreviousUser(allUsers, detectedIndex - 17);
        const previousUser18 = getPreviousUser(allUsers, detectedIndex - 18);
        const previousUser19 = getPreviousUser(allUsers, detectedIndex - 19);
        const previousUser20 = getPreviousUser(allUsers, detectedIndex - 20);
        const previousUser21 = getPreviousUser(allUsers, detectedIndex - 21);
        const previousUser22 = getPreviousUser(allUsers, detectedIndex - 22);
        const previousUser23 = getPreviousUser(allUsers, detectedIndex - 23);
        const previousUser24 = getPreviousUser(allUsers, detectedIndex - 24);
        const previousUser25 = getPreviousUser(allUsers, detectedIndex - 25);
        const previousUser26 = getPreviousUser(allUsers, detectedIndex - 26);
        const previousUser27 = getPreviousUser(allUsers, detectedIndex - 27);
        const previousUser28 = getPreviousUser(allUsers, detectedIndex - 28);
        const previousUser29 = getPreviousUser(allUsers, detectedIndex - 29);
        const previousUser30 = getPreviousUser(allUsers, detectedIndex - 30);
        const previousUser31 = getPreviousUser(allUsers, detectedIndex - 31);
        const previousUser32 = getPreviousUser(allUsers, detectedIndex - 32);
        const previousUser33 = getPreviousUser(allUsers, detectedIndex - 33);
        const previousUser34 = getPreviousUser(allUsers, detectedIndex - 34);
        const previousUser35 = getPreviousUser(allUsers, detectedIndex - 35);
        const previousUser36 = getPreviousUser(allUsers, detectedIndex - 36);
        const previousUser37 = getPreviousUser(allUsers, detectedIndex - 37);
        const previousUser38 = getPreviousUser(allUsers, detectedIndex - 38);
        const previousUser39 = getPreviousUser(allUsers, detectedIndex - 39);
        const previousUser40 = getPreviousUser(allUsers, detectedIndex - 40);
        const previousUser41 = getPreviousUser(allUsers, detectedIndex - 41);
        const previousUser42 = getPreviousUser(allUsers, detectedIndex - 42);
        const previousUser43 = getPreviousUser(allUsers, detectedIndex - 43);
        const previousUser44 = getPreviousUser(allUsers, detectedIndex - 44);
        const previousUser45 = getPreviousUser(allUsers, detectedIndex - 45);
        const previousUser46 = getPreviousUser(allUsers, detectedIndex - 46);
        const previousUser47 = getPreviousUser(allUsers, detectedIndex - 47);
        const previousUser48 = getPreviousUser(allUsers, detectedIndex - 48);
        const previousUser49 = getPreviousUser(allUsers, detectedIndex - 49);
        const previousUser50 = getPreviousUser(allUsers, detectedIndex - 50);

        const detectedUser = gameState.users[detectedIndex];

        const nextUser1 = getNextUser(allUsers, detectedIndex - 1);
        const nextUser2 = getNextUser(allUsers, detectedIndex - 2);
        const nextUser3 = getNextUser(allUsers, detectedIndex - 3);

        resultArray.push(
          previousUser1,
          previousUser2,
          previousUser3,
          previousUser4,
          previousUser5,
          previousUser6,
          previousUser7,
          previousUser8,
          previousUser9,
          previousUser10,
          previousUser11,
          previousUser12,
          previousUser13,
          previousUser14,
          previousUser15,
          previousUser16,
          previousUser17,
          previousUser18,
          previousUser19,
          previousUser20,
          previousUser21,
          previousUser22,
          previousUser23,
          previousUser24,
          previousUser25,
          previousUser26,
          previousUser27,
          previousUser28,
          previousUser29,
          previousUser30,
          previousUser31,
          previousUser32,
          previousUser33,
          previousUser34,
          previousUser35,
          previousUser36,
          previousUser37,
          previousUser38,
          previousUser39,
          previousUser40,
          previousUser41,
          previousUser42,
          previousUser43,
          previousUser44,
          previousUser45,
          previousUser46,
          previousUser47,
          previousUser48,
          previousUser49,
          previousUser50,
          detectedUser,
          nextUser1,
          nextUser2,
          nextUser3
        );
        return resultArray;
      }
    }
  }, [gameState, preDetectedUserId]);

  if (isDetecting && !preDetectedUserId) return <DetectingAnimation />;

  return (
    usersToDisplay && (
      <SearchAnimation
        usersToDisplay={usersToDisplay}
        onAnimationEnd={handleAnimationEnd}
      />
    )
  );
}

export default SearchAnimationWrapper;
