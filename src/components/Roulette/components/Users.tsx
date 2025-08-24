import { Box } from '@mui/material';
import UserAvatar from '../../common/UserAvatar';
import { useGame } from '../../../providers/GameProvider';
import { useMemo } from 'react';

function Users() {
  const { gameState } = useGame();

  const usersWithPositions = useMemo(() => {
    return gameState?.users.map((user, i, arr) => {
      const totalUsers = arr.length;
      const angleStep = (2 * Math.PI) / totalUsers;
      const angle = i * angleStep - Math.PI / 2; // Start from top (-90 degrees)

      // Calculate position on circle (radius is 35% of container)
      const radius = 50; // percentage of container
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
        return (
          <Box
            key={i}
            sx={{
              position: 'absolute',
              left: `${user.x}%`,
              top: `${user.y}%`,
              transform: 'translate(-50%, -50%)',
              zIndex: 5,
            }}
          >
            <UserAvatar user={user} />
          </Box>
        );
      })}
    </Box>
  );
}

export default Users;
