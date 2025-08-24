import StraightIcon from '@mui/icons-material/Straight';
import { Box } from '@mui/material';
import { useGame } from '../../../providers/GameProvider';
import { useMemo } from 'react';

function SelectedAnimation() {
  const { gameState } = useGame();

  console.log('currentState', gameState?.currentState);

  const isDetected = useMemo(() => {
    return gameState?.currentState === 'detected';
  }, [gameState]);

  return (
    <Box
      sx={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        padding: '30px',
      }}
    >
      {isDetected && (
        <StraightIcon
          sx={{
            width: '100px',
            height: '100px',
            animation: 'scaleLot 1s linear infinite',
          }}
        />
      )}
    </Box>
  );
}

export default SelectedAnimation;
