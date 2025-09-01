import { Avatar, Button, CircularProgress } from '@mui/material';
import { useGame } from '../../../providers/GameProvider';
import { useMemo, } from 'react';

function TouchButton() {
  const { gameState, touchButton } = useGame();
  // const { telegramUser } = useTelegram();

  const isDetecting = useMemo(() => {
    return gameState?.currentState !== 'idle';
  }, [gameState]);

  // const currentUser = useMemo(() => {
  //   return gameState?.users.find((user) => user.telegram_id === telegramUser?.id);
  // }, [gameState, telegramUser]);

  // const [timeout, setTimeout] = useState<string | null>(null);

  // useEffect(() => {
  //   const checkTimeRemaining = () => {
  //     if (!currentUser || !currentUser.lastTouched) {
  //       setTimeout(null);
  //       return;
  //     }

  //     const COOLDOWN_PERIOD = 20 * 1000;
  //     const timeDiff = new Date().getTime() - currentUser.lastTouched;
  //     const remainingTime = COOLDOWN_PERIOD - timeDiff;

  //     if (remainingTime <= 0) {
  //       setTimeout(null);
  //       return;
  //     }

  //     const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
  //     const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

  //     const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  //     setTimeout(timeString);
  //   };

  //   checkTimeRemaining();

  //   const interval = setInterval(checkTimeRemaining, 1000);

  //   return () => clearInterval(interval);
  // }, [currentUser]);

  const userTouchedPhotoUrl = useMemo(() => {
    return undefined
    // if (gameState) {
    //   return gameState.users.find((user) => user.telegram_id === touchedUserId)?.photo_url;
    // }
  }, [gameState]);

  if (isDetecting) {
    return (
      <Button
        sx={{
          borderRadius: '50%',
          height: '100px',
          width: '100px',
          zIndex: 200,
          fontWeight: 900,
        }}
        variant="contained"
      >
        {userTouchedPhotoUrl ? (
          <Avatar
            src={userTouchedPhotoUrl}
            alt="Profile"
            sx={{
              width: 100,
              height: 100,
              border: '2px solid rgba(0,0,0,0.1)',
            }}
          />
        ) : (
          <CircularProgress sx={{ color: 'white' }} />
        )}
      </Button>
    );
  }

  // if (timeout) {
  //   return (
  //     <Box
  //       sx={{
  //         borderRadius: '50%',
  //         height: '100px',
  //         width: '100px',
  //         backgroundColor: 'grey',
  //         fontWeight: 900,
  //         display: 'flex',
  //         alignItems: 'center',
  //         justifyContent: 'center',
  //         color: 'white',
  //         zIndex: 200,
  //         lineHeight: 1.2,
  //       }}
  //     >
  //       Your timeout:
  //       <br />
  //       {timeout}
  //     </Box>
  //   );
  // }

  return (
    <Button
      onClick={touchButton}
      sx={{
        borderRadius: '50%',
        height: '100px',
        width: '100px',
        zIndex: 200,
        // backgroundColor: 'red',
        fontWeight: 900,
        lineHeight: 1.4,
      }}
      variant="contained"
    >
      show what you got
    </Button>
  );
}

export default TouchButton;
