import { Paper, Typography } from '@mui/material';
import { useGame } from '../../../providers/GameProvider';

function Logs() {
  const { log } = useGame();
  return (
    <Paper
      elevation={3}
      sx={{
        backgroundColor: 'rgba(255,255,255,0.6)',
        backdropFilter: 'blur(10px)',
        width: '100%',
        display: 'flex',
        // flexGrow: 1,
        flexDirection: 'column',
        padding: '10px',
        minHeight: '200px',
        maxHeight: '200px',
        overflow: 'auto',
      }}
    >
      {log
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        .map((item, index) => (
          <Typography
            key={index}
            sx={{
              textAlign: 'left',
              color: item.type === 'button_touched' ? '#2196f3' : item.type === 'user_selected' ? 'black' : '#666',
            }}
          >
            {new Date(item.timestamp).toLocaleString().split(',')[1]}: {item.message}
          </Typography>
        ))}
    </Paper>
  );
}

export default Logs;
