import React, { createContext, useState, useEffect, type ReactNode, useCallback } from 'react';
import { useTelegram } from '../TelegramProvider/useTelegram';

export interface GameUser {
  socketId: string;
  points: number;
  is_online: boolean;
  first_name: string;
  last_name: string;
  photo_url: string | null;
  telegram_id: string;
  connectedAt: string;
  lastActivity: string;
}

interface GameState {
  users: GameUser[];
  lastUpdate: string;
  totalUsers: number;
  onlineUsers: number;
  currentState: 'idle' | 'detecting' | 'detected';
}

interface ChatMessage {
  type: 'button_touched' | 'user_selected';
  user: {
    telegram_id: string;
    first_name: string;
    last_name: string;
  };
  selectedUser?: {
    telegram_id: string;
    first_name: string;
    last_name: string;
  };
  message: string;
  points?: {
    previous?: number;
    current?: number;
    buttonUser?: number;
    selectedUser?: number;
  };
  timestamp: number;
}

interface GameContextType {
  isConnected: boolean;
  isAuthenticated: boolean;
  gameState: GameState | null;
  currentPoints: number;
  currentUser: GameUser | null;
  log: ChatMessage[];
  touchButton: () => void;
  selectedUser: GameUser | null;
  setSelectedUser: (v: GameUser | null) => void;
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

// interface WelcomeData {
//   message: string;
// }

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

interface JoinedRoomData {
  message: string;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const { telegramUser } = useTelegram();
  const [isConnected, setIsConnected] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [socket, setSocket] = useState<any | null>(null);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [currentPoints, setCurrentPoints] = useState(0);
  const [currentUser, setCurrentUser] = useState<GameUser | null>(null);
  const [selectedUser, setSelectedUser] = useState<GameUser | null>(null);
  const [reconnectAttempts, setReconnectAttempts] = useState(0);
  const [log, setLog] = useState<ChatMessage[]>([]);
  // console.log('gameState', gameState);
  // console.log('currentState', gameState?.currentState);
  const maxReconnectAttempts = 5;

  const addLog = useCallback((message: string) => {
    const timestamp = Date.now();
    const logEntry: ChatMessage = {
      type: 'button_touched',
      user: {
        telegram_id: '',
        first_name: 'System',
        last_name: '',
      },
      message,
      timestamp,
    };
    setLog((prev) => [...prev, logEntry]);
  }, []);

  const connect = useCallback(() => {
    if (socket) {
      socket.disconnect();
    }

    setIsConnected(false);
    setIsAuthenticated(false);
    setCurrentUser(null);
    addLog('Attempting to connect to server...');

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
      addLog(`❌ Connection error: ${errorMessage}`);
      setIsConnected(false);
    }
  }, [socket, addLog]);

  const authenticate = useCallback(
    (socketInstance: any) => {
      if (!socketInstance || !socketInstance.connected) {
        addLog('❌ Cannot authenticate: not connected to server');
        return;
      }

      if (!telegramUser?.id) {
        addLog('❌ Cannot authenticate: no Telegram user ID available');
        return;
      }

      const telegram_id = telegramUser.id.toString();
      // addLog(`🔐 Authenticating with telegram_id: ${telegram_id}`);
      socketInstance.emit('authenticate', { telegram_id });
    },
    [telegramUser, addLog]
  );

  const setupSocketHandlers = useCallback(
    (socketInstance: any) => {
      socketInstance.on('connect', () => {
        setIsConnected(true);
        addLog('✅ Connected to server successfully');
        setReconnectAttempts(0);

        // Auto-authenticate when connected
        if (telegramUser?.id) {
          authenticate(socketInstance);
        }
      });

      socketInstance.on('disconnect', (reason: string) => {
        setIsConnected(false);
        setIsAuthenticated(false);
        setCurrentUser(null);
        addLog(`❌ Disconnected: ${reason}`);

        if (reason === 'io server disconnect') {
          // Server disconnected us, try to reconnect
          setTimeout(() => {
            if (reconnectAttempts < maxReconnectAttempts) {
              setReconnectAttempts((prev) => prev + 1);
              addLog(`🔄 Attempting to reconnect (${reconnectAttempts + 1}/${maxReconnectAttempts})...`);
              connect();
            } else {
              addLog('❌ Max reconnection attempts reached');
            }
          }, 1000);
        }
      });

      // socketInstance.on('welcome', (data: WelcomeData) => {
      //   addLog(`👋 Welcome: ${data.message}`);
      // });

      socketInstance.on('authenticated', (data: AuthenticatedData) => {
        setIsAuthenticated(true);
        setCurrentUser(data.user);
        setCurrentPoints(data.user.points || 0);
        addLog(`✅ Authentication successful: ${data.user.first_name} ${data.user.last_name}`);
      });

      socketInstance.on('auth_error', (data: AuthErrorData) => {
        addLog(`❌ Authentication error: ${data.message}`);
        setIsAuthenticated(false);
        setCurrentUser(null);
      });

      socketInstance.on('joined_game_room', (data: JoinedGameRoomData) => {
        addLog(`🎮 Joined game room: ${data.message}`);
        if (data.yourPoints !== undefined) {
          setCurrentPoints(data.yourPoints);
        }
      });

      socketInstance.on('game_state_update', (data: GameStateUpdateData) => {
        // addLog(`📊 Game state updated - ${data.totalUsers} total users, ${data.onlineUsers} online`);
        setGameState(data);
      });

      socketInstance.on('joined_room', (data: JoinedRoomData) => {
        addLog(`🚪 Joined room: ${data.message}`);
      });

      socketInstance.on('chat_message', (data: ChatMessage) => {
        // console.log('data',data);
        if (data.type === 'user_selected') {
          console.log('selected', data);
        }
        setLog((prev) => [...prev, data]);
      });

      socketInstance.on('connect_error', (error: any) => {
        addLog(`❌ Connection error: ${error.message}`);
        setIsConnected(false);

        if (error.message.includes('xhr poll error')) {
          addLog('💡 This usually means the server is not running or not accessible');
          addLog('💡 Make sure to run: npm run dev');
        }
      });

      socketInstance.on('error', (error: any) => {
        addLog(`❌ Socket error: ${error.message}`);
      });
    },
    [addLog, reconnectAttempts, maxReconnectAttempts, connect, authenticate, telegramUser]
  );

  const touchButton = useCallback(() => {
    if (!telegramUser || !socket || !socket.connected || !isAuthenticated) {
      addLog('❌ Cannot touch');
      return;
    }

    // if (points >= 0) {
    //   setCurrentPoints(points);
    socket.emit('touch_button', { telegram_id: telegramUser.id });
    //   addLog(`📈 Updating points to: ${points}`);
    // }
  }, [telegramUser, socket, isAuthenticated, addLog]);

  // Auto-connect on mount
  useEffect(() => {
    connect();

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

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
    currentPoints,
    currentUser,
    log,
    touchButton,
    selectedUser,
    setSelectedUser,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export { GameContext };
