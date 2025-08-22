import './App.css';
import { AppProvider } from './providers/AppProvider';
import { TelegramProvider } from './providers/TelegramProvider/TelegramProvider';
import { useTelegram } from './providers/TelegramProvider/useTelegram';
import { useApp } from './providers/AppProvider';
import { useMemo } from 'react';

function AppContent() {
  const { webApp } = useTelegram();
  const { isAppLoading } = useApp();
const data = useMemo(()=>{
  if(webApp?.initDataUnsafe?.user){
    return {
      ...webApp.initDataUnsafe.user,
      photo_url: ''
    }
  }
},[webApp])

  if (isAppLoading) {
    return (
      <div className="loading-screen">
        <span className="loader"></span>
      </div>
    );
  }


  return (
    <div className="App">
      <span style={{ position: 'fixed', top: '20px', left: '20px', zIndex: 999, color: 'red' }}>v 0.1</span>

      <header className="App-header">
        <h1>Welcome to Brostep</h1>

        {webApp && (
          <div className="telegram-info">
            <h2>Telegram WebApp Info:</h2>
            <p>Platform: {webApp.platform}</p>
            <p>Version: {webApp.version}</p>
            <img src={webApp?.initDataUnsafe?.user?.photo_url} width={100}></img>
            <span>{JSON.stringify(data, null, 2)}</span>
          </div>
        )}
      </header>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <TelegramProvider>
        <AppContent />
      </TelegramProvider>
    </AppProvider>
  );
}

export default App;
