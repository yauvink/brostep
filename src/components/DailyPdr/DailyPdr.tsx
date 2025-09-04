import { Box, Button } from '@mui/material';
import TouchButton from './components/TouchButton';
import Users from './components/Users/Users';
import ChatMessages from './components/ChatMessages';
import DetectingAnimation from './components/DetectingAnimation';
import ConnectionOverlay from '../Roulette/components/ConnectionOverlay';
import { useTelegram } from '../../providers/TelegramProvider/useTelegram';

function DailyPdr() {
  const { webApp } = useTelegram();

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
      <ConnectionOverlay />

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
          <TouchButton />
          <Users />
          <DetectingAnimation />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', gap: '5px',padding: '10px' }}>
        <Button
        variant='contained'
          onClick={() => {
            webApp?.HapticFeedback.impactOccurred('light');
          }}
        >
          light
        </Button>
        <Button
        variant='contained'
          onClick={() => {
            webApp?.HapticFeedback.impactOccurred('medium');
          }}
        >
          medium
        </Button>
        <Button
        variant='contained'
          onClick={() => {
            webApp?.HapticFeedback.impactOccurred('heavy');
          }}
        >
          heavy
        </Button>
        <Button
        variant='contained'
          onClick={() => {
            webApp?.HapticFeedback.impactOccurred('rigid');
          }}
        >
          rigid
        </Button>
        <Button
        variant='contained'
          onClick={() => {
            webApp?.HapticFeedback.impactOccurred('soft');
          }}
        >
          warning
        </Button>
      </Box>
      <ChatMessages />
    </Box>
  );
}

export default DailyPdr;
