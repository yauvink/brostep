import { Box } from '@mui/material';
import type { GameUser } from '../../../../../providers/GameProvider/GameProvider';
import { useGame } from '../../../../../providers/GameProvider';
import { memo, useEffect, useState } from 'react';

function ScoreChangeAnimation({ currentUser }: { currentUser: GameUser }) {
  const { selectedCompleteData, gameState } = useGame();
  const [scoredPoints, setScoredPoints] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    if (gameState?.currentState === 'detected' && selectedCompleteData) {
      if (selectedCompleteData.selectedUser.telegram_id === currentUser.telegram_id) {
        if (selectedCompleteData.user.telegram_id === selectedCompleteData.selectedUser.telegram_id) {
          setScoredPoints(selectedCompleteData.points.buttonUser);
        } else {
          setScoredPoints(selectedCompleteData.points.selectedUser);
        }
        setShowAnimation(true);
      } else if (selectedCompleteData.user.telegram_id === currentUser.telegram_id) {
        setScoredPoints(selectedCompleteData.points.buttonUser);
        setShowAnimation(true);
      }
    }
  }, [selectedCompleteData, currentUser, gameState]);

  if (!showAnimation) return null;

  return (
    <Box
      onAnimationEnd={() => {
        setShowAnimation(false);
      }}
      sx={{
        borderRadius: '50%',
        position: 'absolute',
        color: scoredPoints > 0 ? 'green' : 'red',
        padding: '10px',
        fontSize: '60px',
        fontWeight: 900,
        zIndex: 10,
        animation: showAnimation ? 'pulse 4s ease-in-out' : 'none',
        WebkitTextStroke: '4px black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {scoredPoints > 0 ? '+' : ''}
      {scoredPoints}
    </Box>
  );
}

export default memo(ScoreChangeAnimation);
