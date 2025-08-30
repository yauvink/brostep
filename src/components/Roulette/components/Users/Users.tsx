import { Box } from '@mui/material';
import { useGame } from '../../../../providers/GameProvider';
import { useMemo } from 'react';
import SelectedAnimation from '../SelectedAnimation';
import User from './components/User';

function Users() {
  const { gameState } = useGame();

  const usersWithPositions = useMemo(() => {
    return gameState?.users.map((user, i, arr) => {
      const totalUsers = arr.length;
      const angleStep = (2 * Math.PI) / totalUsers;
      const angle = i * angleStep - Math.PI / 2; // Start from top (-90 degrees)

      // Calculate position on circle (radius is 35% of container)
      const radius = 45; // percentage of container
      const centerX = 50; // center of container
      const centerY = 50; // center of container

      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      return {
        ...user,
        x,
        y,
      };
    });
  }, [gameState]);

  return (
    <Box
      sx={{
        position: 'absolute',
        width: '100%',
        height: '100%',
      }}
    >
      {usersWithPositions?.map((user, i) => {
        return <User key={i} user={user} x={user.x} y={user.y} />;
      })}

      <SelectedAnimation />
    </Box>
  );
}

export default Users;
