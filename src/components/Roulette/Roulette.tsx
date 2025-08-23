import { Box, Button, Paper } from '@mui/material';
import StraightIcon from '@mui/icons-material/Straight';
import UserAvatar from '../common/UserAvatar';

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
        padding: '30px',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          borderRadius: '50%',
          width: '100%',
          aspectRatio: '1/1',
          backgroundColor: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <Button
          sx={{
            borderRadius: '50%',
            height: '100px',
            width: '100px',
            position: 'absolute',
            zIndex: 10,
          }}
          variant="contained"
        >
          roll
        </Button>

        <Box
          sx={{
            display: 'flex',
            // alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            // border: '1px solid red',
            width: '100%',
            height: '100%',
            padding: '20px',
          }}
        >
          <StraightIcon
            sx={{
              width: '100px',
              height: '100px',
            }}
          />
        </Box>

        <Box sx={{
          position: 'absolute',
          top: '15%',
          left: '15%',
          transform: 'translate(-50%, -50%)',
        }}>
    <UserAvatar size={100}/>
        </Box>
      </Paper>
    </Box>
  );
}

export default Roulette;
