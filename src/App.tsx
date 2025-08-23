import { AppProvider } from './providers/AppProvider';
import { TelegramProvider } from './providers/TelegramProvider/TelegramProvider';
import Main from './components/Main';

function App() {
  return (
    <TelegramProvider>
      <AppProvider>
        <Main />
      </AppProvider>
    </TelegramProvider>
  );
}

export default App;
