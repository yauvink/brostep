import { Paper, Typography } from '@mui/material';
import { useGame } from '../../../providers/GameProvider';
import { useEffect, useRef } from 'react';
import { GameMessageType } from '../../../constants/app.constants';
import { useTranslation } from 'react-i18next';

function ChatMessages() {
  const { chatMessages } = useGame();
  const chatRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

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

      switch (type) {
        case GameMessageType.DETECT_START: {
          return t(`chatMessages.detectStart.${template}`, { userName });
        }
        case GameMessageType.DETECT_FINISHED: {
          if (isSame) {
            return t(`chatMessages.detectFinishedSameUser.${template}`, { userName });
          } else {
            return t(`chatMessages.detectFinished.${template}`, { userName: selectedUserName });
          }
        }
        case GameMessageType.JOIN_GAME: {
          return t(`chatMessages.joinGame.${template}`, { userName });
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
        gap: '5px',
      }}
    >
      {chatMessages
        .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
        .map((item, index) => (
          <Typography key={index} sx={{ textAlign: 'left', lineHeight: 'normal' }}>
            <Typography
              component="span"
              sx={{
                color: item.type === 'app' ? 'green' : item.type === 'sys' ? '#ff9870' : '#666',
                lineHeight: 'normal',
              }}
            >
              [{new Date(item.timestamp).toLocaleString().split(',')[1].replaceAll(' ', '')}]:{' '}
              {/* <span style={{ fontStyle: 'italic', fontWeight: 'normal' }}>{parseChatMessage(item.message)}</span> */}
            </Typography>
            <Typography
              component="span"
              sx={{
                color: item.type === 'app' ? 'green' : item.type === 'sys' ? '#ff9870' : '#666',
                lineHeight: 'normal',
                fontStyle: 'italic',
                b: {
                  color: '#ff9800',
                },
              }}
              dangerouslySetInnerHTML={{ __html: parseChatMessage(item.message) }}
            ></Typography>
          </Typography>
        ))}
    </Paper>
  );
}

export default ChatMessages;
