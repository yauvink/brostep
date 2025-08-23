import { Typography } from '@mui/material';
import { useApp } from '../providers/AppProvider';

function ErrorScreen() {
  const { appError } = useApp();

  return (
    <div className="loading-screen">
      <Typography
        sx={{
          fontSize: '20px',
          color: 'white',
          margin: '30px',
          textAlign: 'center',
        }}
      >
        {appError}
      </Typography>
    </div>
  );
}
export default ErrorScreen;
