import { Box, Avatar } from '@mui/material';
import { Person } from '@mui/icons-material';
import type { GameUser } from '../../providers/GameProvider/GameProvider';

function UserAvatar({ user }: { user: GameUser }) {
  const size = 100;

  return (
    <Box sx={{ width: `${size}px`, minHeight: `${size}px`, display: 'flex', flexDirection: 'column' }}>
      {user?.photo_url ? (
        <Avatar
          src={user.photo_url}
          alt="Profile"
          sx={{
            width: size,
            height: size,
            boxShadow: '0 0 10px 0 rgba(0,0,0,0.5)',
          }}
        />
      ) : (
        <Person sx={{ width: size, height: size }} />
      )}
    </Box>
  );
}
export default UserAvatar;
