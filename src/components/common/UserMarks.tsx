import { Box, Typography } from '@mui/material';
import type { GameUser } from '../../providers/GameProvider/GameProvider';
import mark1 from '../../assets/mark_1.svg';
import { useMemo } from 'react';
import { UserMark } from '../../constants/app.constants';

function UserMarks({ user }: { user: GameUser }) {
  const isHasShieldMark = useMemo(() => {
    return user.marks.includes(UserMark.SHIELD);
  }, [user]);

  const shieldMarkCount = useMemo(() => {
    return user.marks.filter((mark) => mark === UserMark.SHIELD).length;
  }, [user]);

  if (!isHasShieldMark) {
    return null;
  }

  return (
    <Box
      sx={{
        position: 'absolute',
        zIndex: 10000,
        left: -5,
        top: -10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontWeight: 'bold',
      }}
    >
      <img width={30} src={mark1} alt="mark_1" />
      <Typography
        sx={{
          position: 'absolute',
          borderRadius: '50%',
          backgroundColor: 'black',
          padding: '2px',
        }}
      >
        {shieldMarkCount}
      </Typography>
    </Box>
  );
}
export default UserMarks;
