import { Box } from '@mui/material';
import { useTelegram } from '../providers/TelegramProvider/useTelegram';
import { useApp } from '../providers/AppProvider';

function Game() {
  const { webApp } = useTelegram();
  const { userData } = useApp();
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
      }}
    >
      hi {userData?.first_name}
      <br />
      {webApp?.version}
    </Box>
  );
}

export default Game;
