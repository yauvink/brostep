import { Box } from '@mui/material';
import { useApp } from '../providers/AppProvider';
import Roulette from './Roulette/Roulette';
import AppHeader from './common/AppHeader';

function Main() {
  const { isAppLoading } = useApp();

  if (isAppLoading) {
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
      <Roulette />
    </Box>
  );
}
export default Main;
