import React, { createContext, useState, useEffect, type ReactNode, useCallback } from 'react';
import { useTelegram } from '../TelegramProvider/useTelegram';
import { useApp } from '../AppProvider';
import { useError } from '../ErrorProvider';
import { getGames } from '../../services/requests';
import type { LanguageCode } from '../../constants/app.constants';

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
  languageCode: LanguageCode;
  // marks: string[];
}

interface GameState {
  id: string;
  totalUsers: number;
  onlineUsers: number;
  currentState: 'idle' | 'detecting';
  users: GameUser[];
  chatTitle: string;
  chatType: string;
  gameType: 'friendly_fire' | 'daily';
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
  setDetectedUserId: (userId: string | null) => void;
  rooms: Array<{ id: string; chatTitle: string }>;
  setSelectedGameRoom: (gameRoomId: string | null) => void;
  selectedGameRoom: string | null;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const { webApp, paramsGameRoomId } = useTelegram();
  const { authState } = useApp();
  const [socket, setSocket] = useState<any | null>(null);
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [selectedGameRoom, setSelectedGameRoom] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [joinedGameId, setJoinedGameId] = useState<string | null>(null);
  const [detectedUserId, setDetectedUserId] = useState<string | null>(null);
  const [rooms, setRooms] = useState<Array<{ id: string; chatTitle: string }>>([]);
  const { setAppError } = useError();

  console.log('gameState', gameState);

  useEffect(() => {
    if (paramsGameRoomId) {
      setSelectedGameRoom(paramsGameRoomId);
    }
  }, [paramsGameRoomId]);

  const addChatMessage = useCallback((chatMessage: ChatMessage) => {
    setChatMessages((prev) => [...prev, chatMessage]);
  }, []);

  const setupSocketHandlers = useCallback(
    (socketInstance: any, gameRoomId: string) => {
      socketInstance.on('connect', () => {
        setIsSocketConnected(true);
        socketInstance.emit('join_game', { gameRoomId });
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
        addChatMessage({
          type: 'app',
          message: '✅ Connected to game room ',
          timestamp: Date.now(),
        });
      });

      socketInstance.on('join_error', (data: { message: string }) => {
        // console.log('data',data);
        setAppError(`Room ${gameRoomId}. ${data.message}`);
      });

      socketInstance.on('detected', (data: string) => {
        // console.log('detected', data);
        setDetectedUserId(data);
      });
    },
    [addChatMessage, setAppError]
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

  // Auto-connect on mount and reconnect when selectedGameRoom changes
  useEffect(() => {
    // Clean up previous socket connection
    if (socket) {
      socket.disconnect();
      setSocket(null);
      setIsSocketConnected(false);
      setGameState(null);
      setJoinedGameId(null);
      setDetectedUserId(null);
      setChatMessages([]);
    }

    if (authState.accessToken && selectedGameRoom) {
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
          setupSocketHandlers(newSocket, selectedGameRoom);
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

    // Cleanup function
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [authState.authenticated, selectedGameRoom]);

  useEffect(() => {
    // to be sure that user session created and will be returned in the response
    if (authState.authenticated && isSocketConnected && joinedGameId) {
      getGames().then((res) => {
        setRooms(res.data);
      });
    }
  }, [authState.authenticated, isSocketConnected, joinedGameId]);

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
    setDetectedUserId,
    rooms,
    setSelectedGameRoom,
    selectedGameRoom,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export { GameContext };
