import { memo } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { AppProvider, useApp } from "./providers/AppProvider";
import { TelegramProvider } from "./providers/TelegramProvider/TelegramProvider";
import { ErrorProvider, useError } from "./providers/ErrorProvider";
import Main from "./components/Main";
import { APP_VIEW } from "./constants/app.constants";
import Profile from "./components/Profile";
import ErrorScreen from "./components/ErrorScreen";
import { GameProvider } from "./providers/GameProvider/GameProvider";
import theme from "./theme";

const View = memo(() => {
  const { appView } = useApp();
  const { appError } = useError();
  if (appError) return <ErrorScreen />;

  switch (appView) {
    case APP_VIEW.PROFILE: {
      return <Profile />;
    }

    default: {
      return <Main />;
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ErrorProvider>
        <TelegramProvider>
          <AppProvider>
            <GameProvider>
              <View />
            </GameProvider>
          </AppProvider>
        </TelegramProvider>
      </ErrorProvider>
    </ThemeProvider>
  );
}

export default App;
