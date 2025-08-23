import { Box, Typography } from '@mui/material';
import { useTelegram } from '../providers/TelegramProvider/useTelegram';
import { useApp } from '../providers/AppProvider';

function Main() {
  const { webApp, telegramUser } = useTelegram();
  const { isAppLoading } = useApp();

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

      {webApp && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          <p>Platform: {webApp.platform}</p>
          <p>Version: {webApp.version}</p>
          <img src={telegramUser?.photo_url} width={100}></img>
          <p>username: {telegramUser?.username}</p>
          <p>id: {telegramUser?.id}</p>
          <p>first_name: {telegramUser?.first_name}</p>
          <p>last_name: {telegramUser?.last_name}</p>
          <p>language_code: {telegramUser?.language_code}</p>
          <p>allows_write_to_pm: {String(telegramUser?.allows_write_to_pm)}</p>
          <p>is_premium: {String(telegramUser?.is_premium)}</p>
        </Box>
      )}
    </Box>
  );
}
export default Main;
