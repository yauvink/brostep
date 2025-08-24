import StraightIcon from '@mui/icons-material/Straight';
import { Box } from '@mui/material';
import { useGame } from '../../../providers/GameProvider';
import { useMemo } from 'react';

function SelectedAnimation() {
  const { selectedCompleteData, gameState } = useGame();

  console.log('currentState', gameState?.currentState);

  const isDetected = useMemo(() => {
    // return true
    return gameState?.currentState === 'detected';
  }, [gameState]);

  const arrowRotation = useMemo(() => {
    if (!isDetected || !selectedCompleteData || !gameState?.users) {
      return 0;
    }

    // Find the selected user's index in the users array
    const selectedUserIndex = gameState.users.findIndex(
      (user) => user.telegram_id === selectedCompleteData.selectedUser.telegram_id
    );

    if (selectedUserIndex === -1) {
      return 0;
    }

    // Calculate the same angle as in Users component
    const totalUsers = gameState.users.length;
    const angleStep = (2 * Math.PI) / totalUsers;
    const angle = selectedUserIndex * angleStep - Math.PI / 2; // Start from top (-90 degrees)

    // Convert radians to degrees and adjust for the arrow icon
    const degrees = (angle * 180) / Math.PI;

    // The StraightIcon points up by default, so we need to rotate it to point towards the user
    return degrees;
  }, [isDetected, selectedCompleteData, gameState?.users]);

  return (
    <Box
      sx={{
        // border: '1px solid red',
        position: 'absolute',
        width: '100%',
        height: '100%',
        // padding: '30px',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        transform: `rotate(${arrowRotation}deg)`,
      }}
    >
      {isDetected && (
        <StraightIcon
          sx={{
            // border: '1px solid red',
            width: '200px',
            height: '200px',
            // transform: `rotate(90deg)`,
            animation: 'push 1s linear infinite',
          }}
        />
      )}
    </Box>
  );
}

export default SelectedAnimation;
