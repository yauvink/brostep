import { Paper, Typography } from '@mui/material';
import { useGame } from '../../../providers/GameProvider';
import { useEffect, useRef } from 'react';
import { GameMessageType } from '../../../constants/app.constants';

function ChatMessages() {
  const { chatMessages } = useGame();
  const chatRef = useRef<HTMLDivElement>(null);

  // Автоматический скролл вниз при появлении новых сообщений
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const parseChatMessage = (message: string) => {
    try {
      const parsed = JSON.parse(message);
      const {
        type,
        template,
        userName,
        selectedUserName,
        isSame,
      }: { type: GameMessageType; template: number; userName?: string; selectedUserName?: string; isSame?: boolean } =
        parsed;
      console.log('type', type);
      console.log('template', template);
      console.log('userName', userName);
      console.log('selectedUserName', selectedUserName);
      console.log('isSame', isSame);
      switch (type) {
        case GameMessageType.DETECT_START: {
          return `DETECT_START`;
        }
        case GameMessageType.DETECT_FINISHED: {
          return 'DETECT_FINISHED';
        }
        case GameMessageType.JOIN_GAME: {
          return 'JOIN_GAME';
        }
      }
    } catch {
      return message;
    }
  };

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
              color: item.type === 'app' ? 'green' : item.type === 'sys' ? '#ff9870' : '#666',
            }}
          >
            [{new Date(item.timestamp).toLocaleString().split(',')[1].replaceAll(' ', '')}]:{' '}
            <span style={{ fontStyle: 'italic', fontWeight: 'normal' }}>{parseChatMessage(item.message)}</span>
          </Typography>
        ))}
    </Paper>
  );
}

export default ChatMessages;
