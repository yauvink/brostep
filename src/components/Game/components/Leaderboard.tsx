import { Box, Typography, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useGame } from '../../../providers/GameProvider';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';

function Leaderboard() {
  const { gameState } = useGame();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const tableValues = useMemo(() => {
    const data = gameState?.users.map((user) => ({
      name: `${user.firstName} ${user.lastName}`,
      points: user.count,
    }));

    return data?.sort((a, b) => b.points - a.points);
  }, [gameState]);

  return !isOpen ? (
    <Box
      sx={{
        position: 'absolute',
        top: '10px',
        right: '20px',
        zIndex: 900,
      }}
    >
      <IconButton
        color="inherit"
        onClick={() => {
          setIsOpen(true);
        }}
        sx={{
          color: '#333',
          padding: 0,
          border: '2px solid rgba(0,0,0,0.1)',

          width: '50px',
          height: '50px',
          marginRight: '10px',
          '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.1)',
          },
        }}
      >
        <LeaderboardIcon />
      </IconButton>
    </Box>
  ) : (
    <Box
      sx={{
        // width: '100%',
        display: 'flex',
        // height: '100%',
        // justifyContent: 'center',
        position: 'absolute',
        zIndex: 900,
        top: 0,
        left: 10,
        right: 10,
        bottom: -200,
        backgroundColor: 'rgba(255,255,255,0.95)',
      }}
    >
      <IconButton
        color="inherit"
        onClick={() => {
          setIsOpen(false);
        }}
        sx={{
          color: '#333',
          padding: 0,
          border: '2px solid rgba(0,0,0,0.1)',
          position: 'absolute',
          top: '10px',
          right: '20px',
          width: '50px',
          height: '50px',
          marginRight: '10px',
          '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.1)',
          },
        }}
      >
        <Close />
      </IconButton>
      <Box
        sx={{
          // mt: `${iOsPadding() + 20}px`,
          mt: `10px`,
          padding: '20px',
          width: '100%',
        }}
      >
        <Typography variant="h6" sx={{ color: '#333', flexGrow: 1, fontWeight: 'bold' }}>
          {t('leaderboard', { gameName: t('gameName') })}
        </Typography>
        <Box
          sx={{
            // border: '1px solid red',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              borderBottom: '2px solid black',
              padding: '10px',
              width: '100%',
              display: 'flex',
              textAlign: 'center',
              fontWeight: 700,
            }}
          >
            <Box sx={{ minWidth: '30px', color: 'black' }}>#</Box>
            <Typography
              sx={{
                width: '100%',
                fontWeight: 700,
                textAlign: 'left',
                ml: '10px',
                color: 'black',
              }}
            >
              Name
            </Typography>
            <Box sx={{ minWidth: '70px', color: 'black' }}>Points</Box>
          </Box>
          {tableValues?.map((el, i, arr) => (
            <Box
              key={i}
              sx={{
                borderBottom: i < arr.length - 1 ? '1px solid rgba(0,0,0,0.5)' : 'none',
                padding: '10px',
                width: '100%',
                display: 'flex',
                textAlign: 'center',
                color: 'black',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  minWidth: '30px',
                  border: '2px solid red',
                  borderRadius: '50%',
                  height: '30px',
                  color: 'red',
                  fontWeight: 900,
                  textShadow: '1px 2px 2px black',
                }}
              >
                {i + 1}
              </Box>
              <Typography
                sx={{
                  width: '100%',
                  textAlign: 'left',
                  ml: '10px',
                }}
              >
                {el.name}
              </Typography>
              <Box sx={{ minWidth: '70px' }}>{el.points}</Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default Leaderboard;
