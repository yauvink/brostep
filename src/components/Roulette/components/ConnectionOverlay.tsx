import { Box, Typography } from '@mui/material';
import { useGame } from '../../../providers/GameProvider';

function ConnectionOverlay() {
  const { isConnected, isAuthenticated } = useGame();

  const getStatusMessage = () => {
    if (!isConnected) {
      return 'Connecting you to the game...';
    }
    if (!isAuthenticated) {
      return 'Authenticating...';
    }
    return `Connected`;
  };

  const showOverlay = !isConnected || !isAuthenticated;

  if (!showOverlay) return null;

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 10000,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        gap: '20px',
      }}
    >
      <span className="loader"></span>
      <Typography>{getStatusMessage()}</Typography>
    </Box>
  );
}

export default ConnectionOverlay;
