import { Box, Button, Paper, Typography } from '@mui/material';
import StraightIcon from '@mui/icons-material/Straight';
import UserAvatar from '../common/UserAvatar';
import { useGame } from '../../providers/GameProvider';
import ConnectionOverlay from './ConnectionOverlay';

function Roulette() {
  const { log } = useGame();

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
              backgroundColor: 'red',
              fontWeight: 900,
            }}
            variant="contained"
          >
            do not touch
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

          <Box
            sx={{
              position: 'absolute',
              top: '15%',
              left: '15%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <UserAvatar size={100} />
          </Box>
        </Paper>
      </Box>
      <Paper
        elevation={3}
        sx={{
          width: '100%',
          display: 'flex',
          // flexGrow: 1,
          flexDirection: 'column',
          padding: '10px',
          minHeight: '200px',
          maxHeight: '200px',
          overflow: 'auto',
          // alignItems
        }}
      >
        {log.reverse().map((item: string, index: number) => (
          <Typography
            key={index}
            sx={{
              textAlign: 'left',
            }}
          >
            {item}
          </Typography>
        ))}
      </Paper>
    </Box>
  );
}

export default Roulette;
