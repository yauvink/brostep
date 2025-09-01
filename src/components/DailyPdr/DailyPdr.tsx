import { Box, Button } from '@mui/material';
import TouchButton from './components/TouchButton';
import Users from './components/Users/Users';
import ChatMessages from './components/ChatMessages';
import { useGame } from '../../providers/GameProvider';
import DetectingAnimation from './components/DetectingAnimation';

function DailyPdr() {
  const { gameState, connectToGame } = useGame();
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: 'white',
        position: 'relative',
        // border: '1px solid red',
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          // justifyContent: 'flex-end',
          justifyContent: 'center',
          padding: '70px 30px 10px',
          // border: '1px solid blue',
        }}
      >
        <Box
          sx={{
            // border: '1px solid white',
            maxWidth: '800px',
            borderRadius: '50%',
            width: '100%',
            aspectRatio: '1/1',
            backgroundColor: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          {gameState ? (
            <>
              <TouchButton />
              <Users />
              <DetectingAnimation/>
            </>
          ) : (
            <Button variant="contained" onClick={connectToGame}>
              connect to game room
            </Button>
          )}
        </Box>
      </Box>

      <ChatMessages />
    </Box>
  );
}

export default DailyPdr;
