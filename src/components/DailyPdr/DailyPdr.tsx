import { Box } from '@mui/material';
import { useTelegram } from '../../providers/TelegramProvider/useTelegram';

function DailyPdr() {
  const { webApp } = useTelegram();
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
        // border: '1px solid red',
      }}
    >
      <Box
        sx={{
          // border: '1px solid red',
          color: 'black',
          div: {
            borderTop: '1px solid black',
            display: 'block',
          },
          pre: {
            wordBreak: 'break-all',
          },
        }}
      >
        {/* <pre> {JSON.stringify(webApp, null, 2)}</pre> */}
        <div>initDataUnsafe.start_param :</div>
        <pre> {JSON.stringify(webApp?.initDataUnsafe.start_param, null, 2)}</pre>
        <div>initDataUnsafe.user :</div>
        <pre> {JSON.stringify(webApp?.initDataUnsafe.user, null, 2)}</pre>
      </Box>
    </Box>
  );
}

export default DailyPdr;
