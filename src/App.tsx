import { AppProvider, useApp } from './providers/AppProvider';
import { TelegramProvider } from './providers/TelegramProvider/TelegramProvider';
import Main from './components/Main';
import { APP_VIEW } from './constants/app.constants';
import Profile from './components/Profile';
import ErrorScreen from './components/ErrorScreen';
import { GameProvider } from './providers/GameProvider/GameProvider';
import Leaderboard from './components/Leaderboard';

console.log('0.02');

const View = () => {
  const { appView, appError } = useApp();
  if (appError) return <ErrorScreen />;

  switch (appView) {
    case APP_VIEW.PROFILE: {
      return <Profile />;
    }
    case APP_VIEW.LEADERBOARD: {
      return <Leaderboard />;
    }

    default: {
      return <Main />;
    }
  }
};

function App() {
  return (
    <TelegramProvider>
      <AppProvider>
        <GameProvider>
          <View />
        </GameProvider>
      </AppProvider>
    </TelegramProvider>
  );
}

export default App;
