import { Box } from '@mui/material';
import type { GameUser } from '../../../../../providers/GameProvider/GameProvider';
import { memo, useEffect, useState } from 'react';
import { useGame } from '../../../../../providers/GameProvider';
import { useTranslation } from 'react-i18next';

function ScoreChangeAnimation({ currentUser }: { currentUser: GameUser }) {
  console.log('currentUser', currentUser);
  const { detectedUserId, gameState } = useGame();
  const [showAnimation, setShowAnimation] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (detectedUserId === currentUser.id && gameState && gameState.currentState === 'idle') {
      setShowAnimation(true);
    }
  }, [detectedUserId, currentUser, gameState]);

  if (!showAnimation) return null;

  return (
    <Box
      onAnimationEnd={() => {
        setShowAnimation(false);
      }}
      sx={{
        borderRadius: '50%',
        position: 'absolute',
        padding: '10px',
        fontSize: '60px',
        fontWeight: 900,
        zIndex: 1000,
        animation: showAnimation ? 'pulse 4s ease-in-out' : 'none',
        WebkitTextStroke: '4px black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {t('detected')}
    </Box>
  );
}

export default memo(ScoreChangeAnimation);
