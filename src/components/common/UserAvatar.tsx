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
          lineHeight: '14px',
        }}
      >
        {user.first_name}
        <br />
        {user.size}cm
      </Typography>

      {user?.photo_url ? (
        <Avatar
          src={user.photo_url}
          alt="Profile"
          sx={{
            backgroundColor: 'white',
            width: size,
            height: size,
            boxShadow: user.is_online ? '0 0 10px 0 green' : '0 0 10px 0 grey',
            border: user.is_online ? '4px solid green' : '4px solid grey',
            borderRadius: '50%',
          }}
        />
      ) : (
        <Box
          sx={{
            width: size,
            height: size,
            backgroundColor: 'white',
            boxShadow: user.is_online ? '0 0 10px 0 green' : '0 0 10px 0 grey',
            borderRadius: '50%',
            border: user.is_online ? '4px solid green' : '4px solid grey',
          }}
        >
          <Person sx={{ color: 'black', width: size, height: size }} />
        </Box>
      )}
      <Box
        sx={{
          position: 'absolute',
          top: '-5px',
          right: '-5px',
          backgroundColor: user.is_online ? 'green' : 'grey',
          // backgroundColor: '#fff',
          borderRadius: '50%',
          width: '30px',
          height: '30px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '4px',
        }}
      >
        <Box
          sx={{
            // color: user.points > 0 ? 'green' : 'red',
            color: 'black',
            background: '#fff',
            borderRadius: '50%',
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '12px',
          }}
        >
          {user.points}
        </Box>
      </Box>
    </Box>
  );
}
export default UserAvatar;
