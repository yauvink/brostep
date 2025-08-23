import { AppProvider, useApp } from './providers/AppProvider';
import { TelegramProvider } from './providers/TelegramProvider/TelegramProvider';
import Main from './components/Main';
import { APP_VIEW } from './constants/app.constants';
import Profile from './components/Profile';

const View = () => {
  const { appView } = useApp();
  switch (appView) {
    case APP_VIEW.PROFILE: {
      return <Profile />;
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
        <View />
      </AppProvider>
    </TelegramProvider>
  );
}

export default App;
