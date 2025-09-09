import { Box, Button } from '@mui/material';
import { useGame } from '../../../providers/GameProvider';
import { useEffect, useMemo, useState } from 'react';
import { useTelegram } from '../../../providers/TelegramProvider/useTelegram';
import { useTranslation } from 'react-i18next';
import { isToday } from '../../../utils/date';

function TouchButton() {
  const { telegramUser } = useTelegram();
  const { gameState, touchButton } = useGame();
  const { t } = useTranslation();

  const isDetecting = useMemo(() => {
    return gameState?.currentState !== 'idle';
  }, [gameState]);

  const currentUser = useMemo(() => {
    return gameState?.users.find((user) => user.telegramId === telegramUser?.id);
  }, [gameState, telegramUser]);

  const [isCanTouch, setCanTouch] = useState(true);

  // console.log('currentUser.lastDetectedAt',currentUser?.lastDetectedAt);
  useEffect(() => {
    if (gameState) {
      switch (gameState.gameType) {
        case 'friendly_fire':
          {
            console.log('1',1);
            setCanTouch(true);
          break;
          }
        case 'daily': {
          console.log('2',2);
          const checkTimeRemaining = () => {
            if (currentUser) {
              if (currentUser.lastDetectedAt) {
                const serverOffset = 2 * 60 * 60 * 1000;
                const serverDate = currentUser.lastDetectedAt - serverOffset;
                const isTouchedToday = isToday(serverDate);
                setCanTouch(isTouchedToday);
              } else {
                setCanTouch(false);
              }
            }
          };

          checkTimeRemaining();

          const interval = setInterval(checkTimeRemaining, 1000);

          return () => clearInterval(interval);
        }
      }
    }
  }, [gameState, currentUser]);

  if (isDetecting) {
    return (
      <Button
        sx={{
          borderRadius: '50%',
          height: '100px',
          backgroundColor: 'grey',
          width: '100px',
          zIndex: 200,
          fontWeight: 900,
          lineHeight: 1.4,
        }}
        variant="contained"
      >
        {t('button')}
      </Button>
    );
  }

  if (!isCanTouch) {
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
        {t('comeBackTomorrow')}
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
      {t('button')}
    </Button>
  );
}

export default TouchButton;
