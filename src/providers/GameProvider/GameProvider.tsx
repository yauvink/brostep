import React, { createContext, useState, useEffect, type ReactNode, useCallback } from 'react';

interface GameUser {
  socketId: string;
  points: number;
  is_online: boolean;
  first_name: string;
  last_name: string;
  photo_url: string | null;
  connectedAt: string;
  lastActivity: string;
}

interface GameState {
  users: GameUser[];
  lastUpdate: string;
  totalUsers: number;
  onlineUsers: number;
}

interface GameContextType {
  isConnected: boolean;
  gameState: GameState | null;
  currentPoints: number;
  updatePoints: (points: number) => void;
  log: string[];
}

const GameContext = createContext<GameContextType | undefined>(undefined);

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [socket, setSocket] = useState<any | null>(null);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [currentPoints, setCurrentPoints] = useState(0);
  const [reconnectAttempts, setReconnectAttempts] = useState(0);
  const [log, setLog] = useState<string[]>([]);
console.log('gameState', gameState);
  const maxReconnectAttempts = 5;

  const addLog = useCallback((message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = `[${timestamp}] ${message}`;
    setLog(prev => [...prev, logEntry]);
  }, []);

  const connect = useCallback(() => {
    if (socket) {
      socket.disconnect();
    }

    setIsConnected(false);
    addLog('Attempting to connect to server...');

    try {
      // Dynamic import to avoid TypeScript issues
      import('socket.io-client').then(({ io }) => {
        const newSocket = io(import.meta.env.VITE_API_ENDPOINT, {
          transports: ['websocket', 'polling'],
          timeout: 10000,
          forceNew: true
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



  const setupSocketHandlers = useCallback((socketInstance: any) => {
    socketInstance.on('connect', () => {
      setIsConnected(true);
      addLog('✅ Connected to server successfully');
      setReconnectAttempts(0);
    });

    socketInstance.on('disconnect', (reason: string) => {
      setIsConnected(false);
      addLog(`❌ Disconnected: ${reason}`);

      if (reason === 'io server disconnect') {
        // Server disconnected us, try to reconnect
        setTimeout(() => {
          if (reconnectAttempts < maxReconnectAttempts) {
            setReconnectAttempts(prev => prev + 1);
            addLog(`🔄 Attempting to reconnect (${reconnectAttempts + 1}/${maxReconnectAttempts})...`);
            connect();
          } else {
            addLog('❌ Max reconnection attempts reached');
          }
        }, 1000);
      }
    });

    socketInstance.on('welcome', (data: any) => {
      addLog(`👋 Welcome: ${data.message}`);
    });

    socketInstance.on('joined_game_room', (data: any) => {
      addLog(`🎮 Joined game room: ${data.message}`);
      if (data.yourPoints !== undefined) {
        setCurrentPoints(data.yourPoints);
      }
    });

    socketInstance.on('game_state_update', (data: any) => {
      addLog(`📊 Game state updated - ${data.totalUsers} users connected`);
      setGameState(data);
    });

    socketInstance.on('joined_room', (data: any) => {
      addLog(`🚪 Joined room: ${data.message}`);
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
  }, [addLog, reconnectAttempts, maxReconnectAttempts, connect]);

  const updatePoints = useCallback((points: number) => {
    if (!socket || !socket.connected) {
      addLog('❌ Cannot update points: not connected to server');
      return;
    }

    if (points >= 0) {
      setCurrentPoints(points);
      socket.emit('update_points', { points });
      addLog(`📈 Updating points to: ${points}`);
    }
  }, [socket, addLog]);

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
      if (socket && socket.connected) {
        socket.emit('user_activity', { timestamp: new Date().toISOString() });
      }
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, [socket]);

  const value: GameContextType = {
    isConnected,
    gameState,
    currentPoints,
    updatePoints,
    log,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export { GameContext };
