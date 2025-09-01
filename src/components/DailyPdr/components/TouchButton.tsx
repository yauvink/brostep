import { Box, Button, CircularProgress } from '@mui/material';
import { useGame } from '../../../providers/GameProvider';
import { useEffect, useMemo, useState } from 'react';
import { useTelegram } from '../../../providers/TelegramProvider/useTelegram';

function TouchButton() {
  const { telegramUser } = useTelegram();
  const { gameState, touchButton } = useGame();

  const isDetecting = useMemo(() => {
    return gameState?.currentState !== 'idle';
  }, [gameState]);


  const currentUser = useMemo(() => {
    return gameState?.users.find((user) => user.telegramId === telegramUser?.id);
  }, [gameState, telegramUser]);

  const [timeout, setTimeout] = useState<string | null>(null);

  useEffect(() => {
    const checkTimeRemaining = () => {
      if (!currentUser || !currentUser.lastDetectedAt) {
        setTimeout(null);
        return;
      }

      const GAME_TOUCH_TIMEOUT = 10000;
      const timeDiff = new Date().getTime() - currentUser.lastDetectedAt;
      const remainingTime = GAME_TOUCH_TIMEOUT - timeDiff;

      if (remainingTime <= 0) {
        setTimeout(null);
        return;
      }

      const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

      const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      setTimeout(timeString);
    };

    checkTimeRemaining();

    const interval = setInterval(checkTimeRemaining, 1000);

    return () => clearInterval(interval);
  }, [gameState]);

  if (isDetecting) {
    return (
      <Button
        sx={{
          backgroundColor: 'red',
          borderRadius: '50%',
          height: '100px',
          width: '100px',
          zIndex: 200,
          fontWeight: 900,
        }}
        variant="contained"
      >
        <CircularProgress sx={{ color: 'white' }} />
      </Button>
    );
  }

  if (timeout) {
    return (
      <Box
        sx={{
          borderRadius: '50%',
          height: '100px',
          width: '100px',
          backgroundColor: 'grey',
          fontWeight: 900,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          zIndex: 200,
          lineHeight: 1.2,
        }}
      >
        Your timeout:
        <br />
        {timeout}
      </Box>
    );
  }

  return (
    <Button
      onClick={touchButton}
      sx={{
        borderRadius: '50%',
        height: '100px',
        width: '100px',
        zIndex: 200,
        backgroundColor: 'red',
        fontWeight: 900,
        lineHeight: 1.4,
      }}
      variant="contained"
    >
      do not touch!
    </Button>
  );
}

export default TouchButton;
