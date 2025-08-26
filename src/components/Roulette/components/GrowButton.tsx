import { Box, Button } from '@mui/material';
import { useGame } from '../../../providers/GameProvider';
import { useEffect, useMemo, useState } from 'react';
import { useTelegram } from '../../../providers/TelegramProvider/useTelegram';

function GrowButton() {
  const { gameState } = useGame();
  const { telegramUser } = useTelegram();

  const currentUser = useMemo(() => {
    return gameState?.users.find((user) => user.telegram_id === telegramUser?.id);
  }, [gameState, telegramUser]);

  const [timeout, setTimeout] = useState<string | null>(null);

  useEffect(() => {
    const checkTimeRemaining = () => {
      if (!currentUser) {
        setTimeout(null);
        return;
      }

      const remainingTime = currentUser.grow_timestamp + currentUser.grow_timeout - Date.now();

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
  }, [currentUser]);

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        padding: '5px',
      }}
    >
      {timeout ? (
        <Button
          disabled
          sx={{
            width: '100%',
            backgroundColor: '#EFBF04',
            color: 'black',
            fontWeight: 900,
            lineHeight: 1.4,
          }}
          variant="contained"
        >
          Next Grow in {timeout}
        </Button>
      ) : (
        <Button
          onClick={() => {}}
          sx={{
            width: '100%',
            backgroundColor: '#EFBF04',
            color: 'black',
            fontWeight: 900,
            lineHeight: 1.4,
          }}
          variant="contained"
        >
          Grow!
        </Button>
      )}
    </Box>
  );
}

export default GrowButton;
