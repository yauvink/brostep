import { Button } from '@mui/material';
import { useGame } from '../../providers/GameProvider';
import { useMemo } from 'react';

function TouchButton() {
  const { gameState, touchButton } = useGame();
  const isDisabled = useMemo(() => {
    console.log('gameState?.currentState',gameState?.currentState);
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
        position: 'absolute',
        zIndex: 10,
        backgroundColor: 'red',
        fontWeight: 900,
      }}
      variant="contained"
    >
      {isDisabled ? <span className="loader"></span>:
      "do not touch!"}
    </Button>
  );
}

export default TouchButton;
