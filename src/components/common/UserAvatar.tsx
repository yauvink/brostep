import { Box, Avatar, Typography } from '@mui/material';
import { Person } from '@mui/icons-material';
import type { GameUser } from '../../providers/GameProvider/GameProvider';

function UserAvatar({ user }: { user: GameUser }) {
  const size = 70;

  return (
    <Box
      sx={{
        // border: '1px solid red',
        width: `${size}px`,
        minHeight: `${size}px`,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography
        sx={{
          // border: '1px solid red',
          zIndex: 9,
          position: 'absolute',
          bottom: '5px',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'white',
          textShadow: '1px 1px 2px black, 0 0 1em black, 0 0 0.2em black',
        }}
      >
        {user.first_name}
      </Typography>

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
      <Box
        sx={{
          position: 'absolute',
          top: '0px',
          right: '0px',
          backgroundColor: user.is_online ? 'green' : 'grey',
          borderRadius: '50%',
          width: '20px',
          height: '20px',
        }}
      ></Box>

      <Box
        sx={{
          position: 'absolute',
          top: '0px',
          left: '0px',
          backgroundColor: 'white',
          padding: '0 2px',
          borderRadius: '5px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {user.points}
      </Box>
    </Box>
  );
}
export default UserAvatar;
