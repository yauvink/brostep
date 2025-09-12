import { Box, Button } from '@mui/material';
import { useGame } from '../../../providers/GameProvider';
import { useEffect, useMemo, useState } from 'react';
import { useTelegram } from '../../../providers/TelegramProvider/useTelegram';
import { useTranslation } from 'react-i18next';
import { formatTimeLeft, getTimeUntilNextDailyReset, isToday } from '../../../utils/date';

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
  const [timeLeftString, setTimeLeftString] = useState('');

  // console.log('currentUser.lastDetectedAt',currentUser?.lastDetectedAt);
  useEffect(() => {
    if (gameState) {
      switch (gameState.gameType) {
        case 'friendly_fire': {
          setCanTouch(true);
          setTimeLeftString('');
          break;
        }
        case 'daily': {
          const checkTimeRemaining = () => {
            if (currentUser && gameState.serverTimezoneOffset !== undefined) {
              if (currentUser.lastDetectedAt) {
                const currentTime = Date.now();
                const isTouchedToday = isToday(currentUser.lastDetectedAt, currentTime, gameState.serverTimezoneOffset);

                if (isTouchedToday) {
                  const timeUntilReset = getTimeUntilNextDailyReset(currentTime, gameState.serverTimezoneOffset);
                  const timeLeftString = formatTimeLeft(timeUntilReset);
                  setTimeLeftString(timeLeftString);
                  setCanTouch(false);
                } else {
                  // User hasn't touched today, can touch now
                  setCanTouch(true);
                  setTimeLeftString('');
                }
              } else {
                // User never touched, can touch now
                setCanTouch(true);
                setTimeLeftString('');
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
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          zIndex: 200,
          lineHeight: 1.2,
          textAlign: 'center',
          fontSize: '12px',
        }}
      >
        <div>{t('comeBackTomorrow')}</div>
        {timeLeftString && <div style={{ fontSize: '10px', marginTop: '2px' }}>{timeLeftString}</div>}
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
