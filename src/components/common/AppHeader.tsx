import { Person } from '@mui/icons-material';

import { AppBar, Avatar, IconButton, Toolbar, Typography } from '@mui/material';
import { APP_VIEW } from '../../constants/app.constants';
import { useApp } from '../../providers/AppProvider';

function AppHeader() {
  const { userData, setAppView } = useApp();

  return (
    <AppBar
      // position="static"
      sx={{
        // backgroundColor: 'transparent',
        backgroundColor: 'rgba(255,255,255,0.6)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
      }}
    >
      <Toolbar sx={{ height: '70px' }}>
        <Typography variant="h6" sx={{ color: '#333', flexGrow: 1, fontWeight: 'bold' }}>
          Большая Игра на ТНТ
        </Typography>
        <IconButton
          color="inherit"
          onClick={() => setAppView(APP_VIEW.PROFILE)}
          sx={{
            color: '#333',
            padding: 0,
            '&:hover': {
              backgroundColor: 'rgba(0,0,0,0.1)',
            },
          }}
        >
          {userData?.photo_url ? (
            <Avatar
              src={userData.photo_url}
              alt="Profile"
              sx={{
                width: 50,
                height: 50,
                border: '2px solid rgba(0,0,0,0.1)',
              }}
            />
          ) : (
            <Person />
          )}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
export default AppHeader;
