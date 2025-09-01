import { Box } from '@mui/material';
import { useApp } from '../providers/AppProvider';
import AppHeader from './common/AppHeader';
import DailyPdr from './DailyPdr/DailyPdr';

function Main() {
  const { authState } = useApp();

  if (authState.isLoading) {
    return (
      <div className="loading-screen">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppHeader />
      {/* <Game /> */}
      {/* <Roulette /> */}
      <DailyPdr />
    </Box>
  );
}
export default Main;
