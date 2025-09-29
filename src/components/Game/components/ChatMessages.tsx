import { Paper, Typography } from '@mui/material';
import { useGame } from '../../../providers/GameProvider';
import { useEffect, useRef } from 'react';
import { GameMessageType } from '../../../constants/app.constants';
import { useTranslation } from 'react-i18next';
import type { ChatMessage } from '../../../providers/GameProvider/GameProvider';

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

  const parseChatMessage = (chatMessage: ChatMessage) => {
    try {
      const parsed = JSON.parse(chatMessage.message);
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
          return {
            ...chatMessage,
            message: t(`chatMessages.detectStart.${template}`, { userName, gameName: t('gameName') }),
          };
        }
        case GameMessageType.DETECT_FINISHED: {
          if (isSame) {
            return {
              ...chatMessage,
              message: t(`chatMessages.detectFinishedSameUser.${template}`, { userName, gameName: t('gameName') }),
            };
          } else {
            return {
              ...chatMessage,
              message: t(`chatMessages.detectFinished.${template}`, {
                userName: selectedUserName,
                gameName: t('gameName'),
              }),
            };
          }
        }
        case GameMessageType.JOIN_GAME: {
          return {
            ...chatMessage,
            message: t(`chatMessages.joinGame.${template}`, { userName, gameName: t('gameName') }),
            joinGame: true,
          };
        }
      }
    } catch {
      return chatMessage;
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
        padding: '10px 10px 20px',
        minHeight: '200px',
        maxHeight: '200px',
        overflow: 'auto',
        gap: '5px',
      }}
    >
      {chatMessages
        .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
        .map((item, index) => {
          const parsedMessage = parseChatMessage(item);

          return (
            <Typography key={index} sx={{ textAlign: 'left', lineHeight: 'normal' }}>
              <Typography
                component="span"
                sx={{
                  color:
                    'joinGame' in parsedMessage && parsedMessage.joinGame
                      ? 'blue'
                      : parsedMessage.type === 'app'
                      ? 'green'
                      : parsedMessage.type === 'sys'
                      ? '#666'
                      : '#666',
                  lineHeight: 'normal',
                  fontWeight: 'bold',
                }}
              >
                [{new Date(parsedMessage.timestamp).toLocaleString().split(',')[1].replaceAll(' ', '')}]:{' '}
              </Typography>
              <Typography
                component="span"
                sx={{
                  color:
                    'joinGame' in parsedMessage && parsedMessage.joinGame
                      ? 'blue'
                      : parsedMessage.type === 'app'
                      ? 'green'
                      : parsedMessage.type === 'sys'
                      ? '#666'
                      : '#666',
                  lineHeight: 'normal',
                  fontStyle: 'italic',
                  b: {
                    color: 'joinGame' in parsedMessage && parsedMessage.joinGame ? 'blue' : '#ff9800',
                  },
                }}
                dangerouslySetInnerHTML={{ __html: parsedMessage.message }}
              ></Typography>
            </Typography>
          );
        })}
    </Paper>
  );
}

export default ChatMessages;
