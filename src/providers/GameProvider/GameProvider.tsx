import React, { createContext, useState, useEffect, type ReactNode, useCallback } from 'react';
import { useTelegram } from '../TelegramProvider/useTelegram';

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
  socketId: string;
  points: number;
  isOnline: boolean;
  first_name: string;
  last_name: string;
  photo_url: string | null;
  telegram_id: number;
  connectedAt: string;
  lastActivity: string;
  lastTouched: number | null;
  size: number;
  growTimeout: number;
  growTimestamp: number;
}

interface GameState {
  users: GameUser[];
  lastUpdate: string;
  totalUsers: number;
  onlineUsers: number;
  currentState: 'idle' | 'detecting' | 'detected';
}

interface ChatMessage {
  id?: string;
  timestamp: number;
  type: 'user' | 'system' | 'app';
  message: string;
}

interface GameContextType {
  isConnected: boolean;
  isAuthenticated: boolean;
  gameState: GameState | null;
  chatMessages: ChatMessage[];
  touchButton: () => void;
  selectedCompleteData: SelectedCompleteData | null;
  setSelectedCompleteData: (v: SelectedCompleteData | null) => void;
  touchedUserId: number | null;
  growButtonClick: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

interface GameProviderProps {
  children: ReactNode;
}

interface AuthenticatedData {
  user: GameUser;
}

interface AuthErrorData {
  message: string;
}
interface JoinedGameRoomData {
  message: string;
  yourPoints?: number;
}

interface GameStateUpdateData {
  users: GameUser[];
  lastUpdate: string;
  totalUsers: number;
  onlineUsers: number;
  currentState: 'idle' | 'detecting' | 'detected';
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const { telegramUser, webApp } = useTelegram();
  const [isConnected, setIsConnected] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [socket, setSocket] = useState<any | null>(null);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [selectedCompleteData, setSelectedCompleteData] = useState<SelectedCompleteData | null>(null);
  const [touchedUserId, setTouchedUserId] = useState<number | null>(null);
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

    setIsConnected(false);
    setIsAuthenticated(false);
    // addLog({
    //   type: 'app',
    //   message: 'Attempting to connect to server...',
    //   timestamp: Date.now(),
    // });

    try {
      // Dynamic import to avoid TypeScript issues
      import('socket.io-client').then(({ io }: any) => {
        const newSocket = io(import.meta.env.VITE_API_ENDPOINT, {
          transports: ['websocket', 'polling'],
          timeout: 10000,
          forceNew: true,
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
      setIsConnected(false);
    }
  }, [socket, addChatMessage, telegramUser]);

  const authenticate = useCallback(
    (socketInstance: any) => {
      if (!socketInstance || !socketInstance.connected) {
        addChatMessage({
          type: 'app',
          message: '❌ Cannot authenticate: not connected to server',
          timestamp: Date.now(),
        });
        return;
      }

      if (!telegramUser?.id) {
        addChatMessage({
          type: 'app',
          message: '❌ Cannot authenticate: no Telegram user ID available',
          timestamp: Date.now(),
        });
        return;
      }

      const telegram_id = telegramUser.id.toString();
      // addLog(`🔐 Authenticating with telegram_id: ${telegram_id}`);
      socketInstance.emit('authenticate', { telegram_id });
    },
    [telegramUser, addChatMessage]
  );

  const setupSocketHandlers = useCallback(
    (socketInstance: any) => {
      socketInstance.on('connect', () => {
        setIsConnected(true);
        // addChatMessage({
        //   type: 'app',
        //   message: '✅ Connected to server successfully',
        //   timestamp: Date.now(),
        // });
        setReconnectAttempts(0);

        // Auto-authenticate when connected
        if (telegramUser?.id) {
          authenticate(socketInstance);
        }
      });

      socketInstance.on('disconnect', (reason: string) => {
        setIsConnected(false);
        setIsAuthenticated(false);
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

      socketInstance.on('authenticated', (data: AuthenticatedData) => {
        setIsAuthenticated(true);
        addChatMessage({
          type: 'app',
          message: `✅ Authentication successful: ${data.user.first_name} ${data.user.last_name}`,
          timestamp: Date.now(),
        });
      });

      socketInstance.on('auth_error', (data: AuthErrorData) => {
        addChatMessage({
          type: 'app',
          message: `❌ Authentication error: ${data.message}`,
          timestamp: Date.now(),
        });
        setIsAuthenticated(false);
      });

      socketInstance.on('joined_game_room', (data: JoinedGameRoomData) => {
        addChatMessage({
          type: 'app',
          message: `🎮 ${data.message}`,
          timestamp: Date.now(),
        });
      });

      socketInstance.on('game_state_update', (data: GameStateUpdateData) => {
        setGameState(data);
      });

      socketInstance.on('game_state_message', (data: SelectedCompleteData) => {
        console.log('game_state_message', data);
        if (data.type === 'user_selected') {
          setSelectedCompleteData(data);
        } else if (data.type === 'button_touched') {
          setTouchedUserId(data.user.telegram_id);
        }
      });

      socketInstance.on('last_messages', (data: LastMessagesData) => {
        console.log('last_messages', data);
        setChatMessages((prev) => [...prev, ...data.messages]);
      });

      socketInstance.on('chat_message', (data: ChatMessage) => {
        console.log('chat_message', data);
        setChatMessages((prev) => [...prev, data]);
      });

      socketInstance.on('connect_error', (error: any) => {
        addChatMessage({
          type: 'app',
          message: `❌ Connection error: ${error.message}`,
          timestamp: Date.now(),
        });
        setIsConnected(false);

        if (error.message.includes('xhr poll error')) {
          addChatMessage({
            type: 'app',
            message: '💡 This usually means the server is not running or not accessible',
            timestamp: Date.now(),
          });
          addChatMessage({
            type: 'app',
            message: '💡 Make sure to run: npm run dev',
            timestamp: Date.now(),
          });
        }
      });

      socketInstance.on('error', (error: any) => {
        addChatMessage({
          type: 'app',
          message: `❌ Socket error: ${error.message}`,
          timestamp: Date.now(),
        });
      });
    },
    [addChatMessage, reconnectAttempts, maxReconnectAttempts, connect, authenticate, telegramUser]
  );

  const touchButton = useCallback(() => {
    if (!telegramUser || !socket || !socket.connected || !isAuthenticated) {
      addChatMessage({
        type: 'app',
        message: '❌ Cannot touch',
        timestamp: Date.now(),
      });
      return;
    }

    socket.emit('touch_button', { telegram_id: telegramUser.id });
    if (webApp) {
      webApp.HapticFeedback.impactOccurred('soft');
    }
  }, [telegramUser, socket, isAuthenticated, addChatMessage, webApp]);

  const growButtonClick = useCallback(() => {
    if (!telegramUser || !socket || !socket.connected || !isAuthenticated) {
      addChatMessage({
        type: 'app',
        message: '❌ Cannot grow',
        timestamp: Date.now(),
      });
      return;
    }

    socket.emit('grow_button', { telegram_id: telegramUser.id });
    if (webApp) {
      webApp.HapticFeedback.impactOccurred('soft');
    }
  }, [telegramUser, socket, isAuthenticated, addChatMessage, webApp]);
  // const GAME_ROOM_ID = '68b5959a40ec022e1db093aa'
  // Auto-connect on mount
  useEffect(() => {
    if (telegramUser?.id) {
      console.log('SOCKET CONNECT HERE ===');
      connect();

      return () => {
        if (socket) {
          socket.disconnect();
        }
      };
    }
  }, [telegramUser]);

  // Send activity periodically
  useEffect(() => {
    const interval = setInterval(() => {
      if (socket && socket.connected && isAuthenticated) {
        socket.emit('user_activity', { timestamp: new Date().toISOString() });
      }
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, [socket, isAuthenticated]);

  const value: GameContextType = {
    isConnected,
    isAuthenticated,
    gameState,
    chatMessages,
    touchButton,
    selectedCompleteData,
    setSelectedCompleteData,
    touchedUserId,
    growButtonClick,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export { GameContext };
