import StraightIcon from '@mui/icons-material/Straight';
import { Box } from '@mui/material';
import { useGame } from '../../../providers/GameProvider';
import { useMemo } from 'react';

function SpinnerAnimation() {
  const { gameState } = useGame();

  const isSpinning = useMemo(() => {
    return gameState?.currentState === 'detecting';
  }, [gameState]);

  return (
    <Box
      sx={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        padding: '30px',
        animation: isSpinning ? 'spin 1s linear infinite' : 'none',
      }}
    >
      {isSpinning && (
        <StraightIcon
          sx={{
            width: '100px',
            height: '100px',
            animation: isSpinning ? 'scale 5s linear infinite' : 'none',
          }}
        />
      )}
    </Box>
  );
}

export default SpinnerAnimation;
