import { Box, Button, Typography } from '@mui/material';
import { useTelegram } from '../providers/TelegramProvider/useTelegram';
import { useApp } from '../providers/AppProvider';
import { APP_VIEW } from '../constants/app.constants';

function Main() {
  const { webApp } = useTelegram();
  const { isAppLoading, userData, setAppView } = useApp();

  if (isAppLoading) {
    return (
      <div className="loading-screen">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <Box
      sx={{
        padding: '20px',
        width: '100%',
      }}
    >
      <span style={{ position: 'fixed', top: '10px', right: '10px', zIndex: 999, color: 'white' }}>0.3</span>

      <Typography sx={{ fontSize: '30px', color: 'white', mb: '30px' }}>Welcome</Typography>

      <Button onClick={() => setAppView(APP_VIEW.PROFILE)}>Profile</Button>

      {webApp && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
          }}
        >
          <p>Platform: {webApp.platform}</p>
          <p>Version: {webApp.version}</p>
          <img src={userData?.photo_url ?? ''} width={100}></img>
          <p>first_name: {userData?.first_name}</p>
          <p>last_name: {userData?.last_name}</p>
          <p>username: {userData?.username}</p>
          <p>id: {userData?.id}</p>
          <p>telegram_id: {userData?.telegram_id}</p>
          <p>created_at: {userData?.created_at}</p>
          <p>updated_at: {userData?.updated_at}</p>
          {/* <p>language_code: {userData?.language_code}</p> */}
          {/* <p>allows_write_to_pm: {String(userData?.allows_write_to_pm)}</p> */}
          <p>is_premium: {String(userData?.is_premium)}</p>
        </Box>
      )}
    </Box>
  );
}
export default Main;
