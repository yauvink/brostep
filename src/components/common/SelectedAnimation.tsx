import { Box } from '@mui/material';
import arrow_cropped from '../../assets/arrow_cropped.png';
import { useGame } from '../../providers/GameProvider';
import { useMemo } from 'react';

function SelectedAnimation() {
  const { detectedUserId, gameState } = useGame();

  const isDetected = useMemo(() => {
    return gameState?.currentState === 'idle';
  }, [gameState]);

  const arrowRotation = useMemo(() => {
    if (!isDetected || !detectedUserId || !gameState?.users) {
      return 0;
    }

    // Find the selected user's index in the users array
    const selectedUserIndex = gameState.users.findIndex((user) => user.id === detectedUserId);

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
  }, [isDetected, detectedUserId, gameState?.users]);

  if (!detectedUserId) return null;

  return (
    <Box
      sx={{
        // border: '1px solid red',
        position: 'absolute',
        zIndex: 100,
        width: '100%',
        height: '100%',
        padding: '70px',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        transform: `rotate(${arrowRotation}deg)`,
      }}
    >
      {isDetected && (
        <Box
          sx={{
            // border: '1px solid red',
            width: '40px',
            height: '200px',
            // transform: `rotate(90deg)`,
            animation: 'push 1s linear infinite',
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

export default SelectedAnimation;
