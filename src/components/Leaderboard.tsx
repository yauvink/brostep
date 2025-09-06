import { Box, Typography, AppBar, Toolbar, IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useApp } from '../providers/AppProvider';
import { APP_VIEW } from '../constants/app.constants';
import { iOsPadding } from '../utils/browser';
import { useGame } from '../providers/GameProvider';
import { useMemo } from 'react';

function Leaderboard() {
  const { setAppView } = useApp();
  const { gameState } = useGame();

  const tableValues = useMemo(() => {
    const data = gameState?.users.map((user) => ({
      name: `${user.firstName} ${user.lastName}`,
      points: user.count,
    }));

    return data?.sort((a, b) => b.points - a.points);
  }, [gameState]);

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          maxHeight: '100%',
          width: '100%',
          maxWidth: '480px',
          position: 'fixed',
          top: 0,
          bottom: 0,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'auto',
        }}
      >
        <AppBar
          // position="static"
          sx={{
            paddingTop: `${iOsPadding()}px`,
            backgroundColor: 'rgba(255,255,255,0.6)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            borderBottom: '1px solid rgba(0,0,0,0.1)',
          }}
        >
          <Toolbar sx={{ height: '70px' }}>
            <IconButton edge="start" onClick={() => setAppView(APP_VIEW.MAIN)} sx={{ mr: 2, color: 'black' }}>
              <ArrowBack />
            </IconButton>
            <Typography variant="h6" sx={{ color: '#333', flexGrow: 1, fontWeight: 'bold' }}>
              Leaderboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            mt: `${iOsPadding() + 70}px`,
            padding: '20px',
          }}
        >
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
              <Box sx={{ minWidth: '30px' }}>#</Box>
              <Typography
                sx={{
                  width: '100%',
                  fontWeight: 700,
                  textAlign: 'left',
                  ml: '10px',
                }}
              >
                Name
              </Typography>
              <Box sx={{ minWidth: '70px' }}>Points</Box>
            </Box>
            {tableValues?.map((el, i, arr) => (
              <Box
                key={i}
                sx={{
                  borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.2)' : 'none',
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
                    border: '1px solid yellow',
                    borderRadius: '50%',
                    height: '30px',
                    color: 'yellow',
                    fontWeight: 900,
                    textShadow: '1px 2px 2px black'
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
    </Box>
  );
}

export default Leaderboard;
