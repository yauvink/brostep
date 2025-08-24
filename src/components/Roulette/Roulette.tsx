import { Box } from '@mui/material';
import ConnectionOverlay from './components/ConnectionOverlay';
import TouchButton from './components/TouchButton';
import SpinnerAnimation from './components/SpinnerAnimation';
import Logs from './components/Logs';
import Users from './components/Users/Users';

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
          justifyContent: 'center',
          padding: '20px',
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

      <Logs />
    </Box>
  );
}

export default Roulette;
