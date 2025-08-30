import { Box } from '@mui/material';
import ConnectionOverlay from './components/ConnectionOverlay';
import TouchButton from './components/TouchButton';
import SpinnerAnimation from './components/SpinnerAnimation';
import ChatMessages from './components/ChatMessages';
import Users from './components/Users/Users';
import GrowButton from './components/GrowButton';

function Roulette() {
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

          <SpinnerAnimation />

          <Users />
        </Box>
      </Box>

      <GrowButton />

      <ChatMessages />
    </Box>
  );
}

export default Roulette;
