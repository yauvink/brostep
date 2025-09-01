function GrowButton() {
  // const { gameState, growButtonClick } = useGame();
  // const { telegramUser } = useTelegram();

  // const currentUser = useMemo(() => {
  //   return gameState?.users.find((user) => user.telegram_id === telegramUser?.id);
  // }, [gameState, telegramUser]);

  // const [timeout, setTimeout] = useState<string | null>(null);

  // useEffect(() => {
  //   const checkTimeRemaining = () => {
  //     if (!currentUser) {
  //       setTimeout(null);
  //       return;
  //     }

  //     const remainingTime = currentUser.growTimestamp + currentUser.growTimeout - Date.now();

  //     if (remainingTime <= 0) {
  //       setTimeout(null);
  //       return;
  //     }

  //     const hours = Math.floor(remainingTime / (1000 * 60 * 60));
  //     const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
  //     const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

  //     setTimeout(
  //       `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
  //         .toString()
  //         .padStart(2, '0')}`
  //     );
  //   };

  //   checkTimeRemaining();

  //   const interval = setInterval(checkTimeRemaining, 1000);

  //   return () => clearInterval(interval);
  // }, [currentUser]);

  return null;
  // <Box
  //   sx={{
  //     display: 'flex',
  //     width: '100%',
  //     padding: '15px',
  //   }}
  // >
  //   {timeout ? (
  //     <Button
  //       disabled
  //       sx={{
  //         width: '100%',
  //         backgroundColor: '#EFBF04',
  //         color: 'black',
  //         fontWeight: 900,
  //         lineHeight: 1.4,
  //       }}
  //       variant="contained"
  //     >
  //       Next Grow in {timeout}
  //     </Button>
  //   ) : (
  //     <Button
  //       onClick={growButtonClick}
  //       sx={{
  //         width: '100%',
  //         backgroundColor: '#EFBF04',
  //         color: 'black',
  //         fontWeight: 900,
  //         lineHeight: 1.4,
  //       }}
  //       variant="contained"
  //     >
  //       Grow!
  //     </Button>
  //   )}
  // </Box>
}

export default GrowButton;
