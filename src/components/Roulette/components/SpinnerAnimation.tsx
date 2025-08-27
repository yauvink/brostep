import { Box } from '@mui/material';
import { useGame } from '../../../providers/GameProvider';
import { useMemo } from 'react';
import arrow_cropped from '../../../assets/arrow_cropped.png';

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
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        animation: isSpinning ? 'spin1 2s linear forwards, spin2 1s linear forwards 2s, spin3 0.5s linear infinite 3s' : 'none',
      }}
    >
      {isSpinning && (
        <Box
          sx={{
            // border: '1px solid red',
            animation: isSpinning ? 'scale 5s linear' : 'none',
            width: '40px',
            height: '200px',
            backgroundImage: `url(${arrow_cropped})`,
            // backgroundSize: '79px 399px',
            backgroundPosition: 'bottom',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
          }}
        />
      )}
    </Box>
  );
}

export default SpinnerAnimation;
