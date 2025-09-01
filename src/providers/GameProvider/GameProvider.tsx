import React, { createContext, useState, useEffect, type ReactNode, useCallback } from 'react';
import { useTelegram } from '../TelegramProvider/useTelegram';
import { useApp } from '../AppProvider';

export interface SelectedCompleteData {
  type: 'user_selected';
  timestamp: number;
  user: {
    telegram_id: number;
    first_name: string;
    last_name: string;
  };
  selectedUser: {
    telegram_id: number;
    first_name: string;
    last_name: string;
  };
  points: {
    buttonUser: number;
    selectedUser: number;
  };
}

export interface LastMessagesData {
  messages: ChatMessage[];
  timestamp: number;
}

export interface GameUser {
  id: string;
  telegramId: number;
  firstName: string;
  lastName: string;
  photoUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
  count: number;
  lastDetectedAt: Date | null;
  isOnline: boolean;
}

interface GameState {
  id: string;
  totalUsers: number;
  onlineUsers: number;
  currentState: 'idle' | 'detecting';
  users: GameUser[];
}

interface ChatMessage {
  id?: string;
  timestamp: number;
  type: 'user' | 'system' | 'app';
  message: string;
}

interface GameContextType {
  gameState: GameState | null;
  chatMessages: ChatMessage[];
  touchButton: () => void;
  selectedCompleteData: SelectedCompleteData | null;
  setSelectedCompleteData: (v: SelectedCompleteData | null) => void;
  connectToGame: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const { telegramUser, webApp } = useTelegram();
  const { authState } = useApp();
  const [socket, setSocket] = useState<any | null>(null);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [selectedCompleteData, setSelectedCompleteData] = useState<SelectedCompleteData | null>(null);
  const [reconnectAttempts, setReconnectAttempts] = useState(0);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  const maxReconnectAttempts = 5;

  const addChatMessage = useCallback((chatMessage: ChatMessage) => {
    setChatMessages((prev) => [...prev, chatMessage]);
  }, []);

  const connect = useCallback(() => {
    if (socket) {
      socket.disconnect();
    }

    // addLog({
    //   type: 'app',
    //   message: 'Attempting to connect to server...',
    //   timestamp: Date.now(),
    // });

    try {
      // Dynamic import to avoid TypeScript issues
      import('socket.io-client').then(({ io }: any) => {
        const newSocket = io(import.meta.env.VITE_API_BACKEND_ENDPOINT, {
          transports: ['websocket', 'polling'],
          timeout: 10000,
          forceNew: true,
          auth: { token: authState.accessToken },
        });

        setSocket(newSocket);
        setupSocketHandlers(newSocket);
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      addChatMessage({
        type: 'app',
        message: `❌ Connection error: ${errorMessage}`,
        timestamp: Date.now(),
      });
    }
  }, [socket, addChatMessage, authState]);

  const setupSocketHandlers = useCallback(
    (socketInstance: any) => {
      socketInstance.on('connect', () => {
        addChatMessage({
          type: 'app',
          message: '✅ Connected to server successfully',
          timestamp: Date.now(),
        });
        setReconnectAttempts(0);
      });

      socketInstance.on('disconnect', (reason: string) => {
        addChatMessage({
          type: 'app',
          message: `❌ Disconnected: ${reason}`,
          timestamp: Date.now(),
        });

        if (reason === 'io server disconnect') {
          // Server disconnected us, try to reconnect
          setTimeout(() => {
            if (reconnectAttempts < maxReconnectAttempts) {
              setReconnectAttempts((prev) => prev + 1);
              addChatMessage({
                type: 'app',
                message: `🔄 Attempting to reconnect (${reconnectAttempts + 1}/${maxReconnectAttempts})...`,
                timestamp: Date.now(),
              });
              connect();
            } else {
              addChatMessage({
                type: 'app',
                message: '❌ Max reconnection attempts reached',
                timestamp: Date.now(),
              });
            }
          }, 1000);
        }
      });

      socketInstance.on('game_state_update', (data: GameState) => {
        console.log('game_state_update', data);
        setGameState(data);
      });

      // socketInstance.on('last_messages', (data: LastMessagesData) => {
      //   console.log('last_messages', data);
      //   setChatMessages((prev) => [...prev, ...data.messages]);
      // });

      // socketInstance.on('chat_message', (data: ChatMessage) => {
      //   console.log('chat_message', data);
      //   setChatMessages((prev) => [...prev, data]);
      // });
    },
    [addChatMessage, reconnectAttempts, maxReconnectAttempts, connect, telegramUser]
  );

  const touchButton = useCallback(() => {
    console.log('to');
    if (!socket || !socket.connected) {
      addChatMessage({
        type: 'app',
        message: '❌ Cannot touch',
        timestamp: Date.now(),
      });
      return;
    }

    socket.emit('detect');

    if (webApp) {
      webApp.HapticFeedback.impactOccurred('soft');
    }
  }, [socket, addChatMessage, webApp]);

  // Auto-connect on mount
  useEffect(() => {
    if (authState.accessToken) {
      connect();

      return () => {
        if (socket) {
          socket.disconnect();
        }
      };
    }
  }, [authState]);

  // Send activity periodically
  useEffect(() => {
    const interval = setInterval(() => {
      if (socket && socket.connected) {
        socket.emit('user_activity', { timestamp: new Date().toISOString() });
      }
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, [socket]);

  const connectToGame = useCallback(() => {
    // this.socket.emit('join_game', { gameId: this.gameId });
    if (!socket || !socket.connected) {
      addChatMessage({
        type: 'app',
        message: '❌ Cannot touch',
        timestamp: Date.now(),
      });
      return;
    }

    const GAME_ROOM_ID = '68b5959a40ec022e1db093aa';

    socket.emit('join_game', { gameId: GAME_ROOM_ID });
    if (webApp) {
      webApp.HapticFeedback.impactOccurred('soft');
    }
  }, [socket, addChatMessage, webApp]);

  const value: GameContextType = {
    gameState,
    chatMessages,
    touchButton,
    selectedCompleteData,
    setSelectedCompleteData,
    connectToGame,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export { GameContext };
