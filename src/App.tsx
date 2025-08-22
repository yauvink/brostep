import './App.css';
import { TelegramProvider } from './providers/TelegramProvider/TelegramProvider';
import { useTelegram } from './providers/TelegramProvider/useTelegram';

function AppContent() {
  const { webApp } = useTelegram();

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Brostep</h1>

        {webApp && (
          <div className="telegram-info">
            <h2>Telegram WebApp Info:</h2>
            <p>Platform: {webApp.platform}</p>
            <p>Version: {webApp.version}</p>
            <p>User: {webApp.initDataUnsafe?.user?.first_name || 'Unknown'}</p>
            <span>{JSON.stringify(webApp.initDataUnsafe?.user, null, 2)}</span>
          </div>
        )}
      </header>
    </div>
  );
}

function App() {
  return (
    <TelegramProvider>
      <AppContent />
    </TelegramProvider>
  );
}

export default App;
