import { Box, Typography, AppBar, Toolbar, IconButton, Avatar } from '@mui/material';
import { Person } from '@mui/icons-material';
import { useApp } from '../providers/AppProvider';
import { APP_VIEW } from '../constants/app.constants';
import Game from './Game';

function Main() {
  const { isAppLoading, userData, setAppView } = useApp();

  if (isAppLoading) {
    return (
      <div className="loading-screen">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', backgroundColor: '#0E111B', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <AppBar
        position="static"
        sx={{
          backgroundColor: 'rgba(14, 17, 27, 0.9)',
          backdropFilter: 'blur(10px)',
          boxShadow: 'none',
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}
      >
        <Toolbar sx={{ height: '70px' }}>
          <Typography variant="h6" sx={{ color: 'white', flexGrow: 1 }}>
            BroStep
          </Typography>
          <IconButton
            color="inherit"
            onClick={() => setAppView(APP_VIEW.PROFILE)}
            sx={{
              color: 'white',
              padding: 0,
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)'
              }
            }}
          >
            {userData?.photo_url ? (
              <Avatar
                src={userData.photo_url}
                alt="Profile"
                sx={{
                  width: 50,
                  height: 50,
                  border: '2px solid rgba(255,255,255,0.2)'
                }}
              />
            ) : (
              <Person />
            )}
          </IconButton>
        </Toolbar>
      </AppBar>

        <Game />
    </Box>
  );
}
export default Main;
