import { Box, Button, Paper, Typography } from '@mui/material';
import StraightIcon from '@mui/icons-material/Straight';
import UserAvatar from '../common/UserAvatar';
import { useGame } from '../../providers/GameProvider';
import ConnectionOverlay from './ConnectionOverlay';
import { useMemo } from 'react';

function Roulette() {
  const { log, gameState } = useGame();

  const usersWithPositions = useMemo(() => {
    return gameState?.users.map((user, i, arr) => {
      const totalUsers = arr.length
      const angleStep = (2 * Math.PI) / totalUsers;
      const angle = i * angleStep - Math.PI / 2; // Start from top (-90 degrees)

      // Calculate position on circle (radius is 35% of container)
      const radius = 50; // percentage of container
      const centerX = 50; // center of container
      const centerY = 50; // center of container

      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

   return {
    ...user,
    x,
    y
   }
    });
  }, [gameState]);

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
              width: '100%',
              height: '100%',
            }}
          >
            {usersWithPositions?.map((user, i) => {
              return (
                <Box
                  key={i}
                  sx={{
                    position: 'absolute',
                    left: `${user.x}%`,
                    top: `${user.y}%`,
                    transform: 'translate(-50%, -50%)',
                    zIndex: 5,
                  }}
                >
                  <UserAvatar user={user} />
                </Box>
              );
            })}
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
