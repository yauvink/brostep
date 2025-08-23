import { Box, Avatar } from '@mui/material';
import { Person } from '@mui/icons-material';
import { useApp } from '../../providers/AppProvider';

function UserAvatar({size = 30}: {size?: number}) {
  const { userData } = useApp();

  return (
    <Box sx={{ width: `${size}px`, minHeight: `${size}px`, display: 'flex', flexDirection: 'column' }}>
      {userData?.photo_url ? (
        <Avatar
          src={userData.photo_url}
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
