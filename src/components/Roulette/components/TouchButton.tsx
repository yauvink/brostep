import { Button, CircularProgress } from '@mui/material';
import { useGame } from '../../../providers/GameProvider';
import { useMemo } from 'react';

function TouchButton() {
  const { gameState, touchButton } = useGame();
  const isDisabled = useMemo(() => {
    return gameState?.currentState !== 'idle';
  }, [gameState]);

  return (
    <Button
      disabled={isDisabled}
      onClick={touchButton}
      sx={{
        borderRadius: '50%',
        height: '100px',
        width: '100px',
        zIndex: 10,
        backgroundColor: 'red',
        fontWeight: 900,
      }}
      variant="contained"
    >
      {isDisabled ? <CircularProgress sx={{ color: 'white' }} /> : 'do not touch!'}
    </Button>
  );
}

export default TouchButton;
