import { Paper, Typography } from '@mui/material';
import { useGame } from '../../../providers/GameProvider';
import { useEffect, useRef } from 'react';

function ChatMessages() {
  const { chatMessages } = useGame();
  const chatRef = useRef<HTMLDivElement>(null);

  // Автоматический скролл вниз при появлении новых сообщений
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chatMessages]);

  return (
    <Paper
      ref={chatRef}
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
      {chatMessages
        .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
        .map((item, index) => (
          <Typography
            key={index}
            sx={{
              textAlign: 'left',
              fontWeight: 'bold',
              color: item.message.includes('достает свое')
                ? 'black'
                : item.message.includes('grew from size')
                ? 'blue'
                : item.type === 'app'
                ? '#666'
                : item.type === 'user'
                ? '#4caf50'
                : item.type === 'sys'
                ? '#ff9800'
                : '#666',
            }}
          >
            [{item.type.slice(0, 3).toUpperCase()}] {new Date(item.timestamp).toLocaleString().split(',')[1]}:{' '}
            <span style={{ fontStyle: 'italic', fontWeight: 'normal' }}>{item.message}</span>
          </Typography>
        ))}
    </Paper>
  );
}

export default ChatMessages;
