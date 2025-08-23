import { AppProvider } from './providers/AppProvider';
import { TelegramProvider } from './providers/TelegramProvider/TelegramProvider';
import Main from './components/Main';

function App() {
  return (
    <AppProvider>
      <TelegramProvider>
        <Main />
      </TelegramProvider>
    </AppProvider>
  );
}

export default App;
