import { Box, Typography } from '@mui/material';
import { useGame } from '../../../providers/GameProvider';
import { useMemo } from 'react';

function NavBar() {
  const { gameState } = useGame();
  // const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const tabs = useMemo(() => {
    if (!gameState) return [];

    return [
      {
        label: gameState.chatTitle,
        value: gameState.id,
      },
      {
        label: 'Add',
        value: 'add',
      },
    ];
  }, [gameState]);

  console.log('tabs', tabs);

  return (
    <Box
      sx={{
        // border: '1px solid red',
        width: '100%',
      }}
    >
      <Typography
        sx={{
          fontSize: '20px',
          fontWeight: 'bold',
          color: 'white',
          textAlign: 'left',
          padding: '10px',
        }}
      >
        {gameState?.chatTitle}
      </Typography>
      {/* <Box
        sx={{
          display: 'flex',
          borderBottom: '5px solid grey',
          // gap: '10px',
        }}
      >
        {tabs.map((tab) => (
          <Box
            key={tab.value}
            sx={{
              border: '1px solid red',
              padding: '10px',
              borderTopLeftRadius: '10px',
              borderTopRightRadius: '10px',
            }}
          >
            {tab.label}
          </Box>
        ))}
      </Box> */}
    </Box>
  );
}

export default NavBar;
