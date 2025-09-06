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

export interface GameUser {
  id: string;
  telegramId: number;
  firstName: string;
  lastName: string;
  photoUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
  count: number;
  lastDetectedAt: number | null;
  isOnline: boolean;
}

interface GameState {
  id: string;
  totalUsers: number;
  onlineUsers: number;
  currentState: 'idle' | 'detecting';
  users: GameUser[];
}

export interface ChatMessage {
  id?: string;
  timestamp: number;
  type: 'sys' | 'app';
  message: string;
}

interface GameContextType {
  gameState: GameState | null;
  chatMessages: ChatMessage[];
  touchButton: () => void;
  isSocketConnected: boolean;
  joinedGameId: string | null;
  detectedUserId: string | null;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const { webApp, chatInstanceId } = useTelegram();
  const { authState } = useApp();
  const [socket, setSocket] = useState<any | null>(null);
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [joinedGameId, setJoinedGameId] = useState<string | null>(null);
  const [detectedUserId, setDetectedUserId] = useState<string | null>(null);

  const addChatMessage = useCallback((chatMessage: ChatMessage) => {
    setChatMessages((prev) => [...prev, chatMessage]);
  }, []);

  const setupSocketHandlers = useCallback(
    (socketInstance: any) => {
      socketInstance.on('connect', () => {
        addChatMessage({
          type: 'app',
          message: '✅ Connected to server successfully',
          timestamp: Date.now(),
        });
        setIsSocketConnected(true);
        socketInstance.emit('join_game', { chatInstanceId });
      });

      socketInstance.on('disconnect', (reason: string) => {
        addChatMessage({
          type: 'app',
          message: `❌ Disconnected: ${reason}`,
          timestamp: Date.now(),
        });
        setIsSocketConnected(false);
      });

      socketInstance.on('game_state_update', (data: GameState) => {
        // console.log('game_state_update', data);
        setGameState(data);
      });

      socketInstance.on('last_messages', (data: ChatMessage[]) => {
        // console.log('last_messages', data);
        setChatMessages((prev) => [...prev, ...data]);
      });

      socketInstance.on('chat_message', (data: ChatMessage) => {
        // console.log('chat_message', data);
        setChatMessages((prev) => [...prev, data]);
      });

      socketInstance.on('game_joined', (data: string) => {
        // console.log('game_joined', data);
        setJoinedGameId(data);
      });

      socketInstance.on('detected', (data: string) => {
        // console.log('detected', data);
        setDetectedUserId(data);
      });


    },
    [addChatMessage, chatInstanceId]
  );

  const touchButton = useCallback(() => {
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
      webApp.HapticFeedback.impactOccurred('heavy');
    }
  }, [socket, addChatMessage, webApp]);

  // Auto-connect on mount
  useEffect(() => {
    if (authState.accessToken && chatInstanceId) {
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
    }
  }, [authState, chatInstanceId]);

  // Send activity periodically
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (socket && socket.connected) {
  //       socket.emit('user_activity', { timestamp: new Date().toISOString() });
  //     }
  //   }, 30000); // Every 30 seconds

  //   return () => clearInterval(interval);
  // }, [socket]);

  const value: GameContextType = {
    gameState,
    chatMessages,
    touchButton,
    isSocketConnected,
    joinedGameId,
    detectedUserId,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export { GameContext };
