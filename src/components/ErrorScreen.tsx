import { Typography } from '@mui/material';
import { useError } from '../providers/ErrorProvider';

function ErrorScreen() {
  const { appError } = useError();

  return (
    <div className="loading-screen">
      <Typography
        sx={{
          fontSize: '20px',
          margin: '30px',
          textAlign: 'center',
          color: 'red',
        }}
      >
        {appError}
      </Typography>
    </div>
  );
}
export default ErrorScreen;
