import { Box } from '@mui/material';
import type { GameUser } from '../../providers/GameProvider/GameProvider';
import mark1 from '../../assets/mark_1.svg';
import { useMemo } from 'react';

function UserMarks({ user }: { user: GameUser }) {
  const isHasMark1 = useMemo(() => {
    return user.marks.includes('pdr_father');
  }, [user]);

  if (!isHasMark1) {
    return null;
  }

  return (
    <Box
      sx={{
        position: 'absolute',
        zIndex: 10000,
        left: -5,
        top: -10,
      }}
    >
      <img width={30} src={mark1} alt="mark_1" />
    </Box>
  );
}
export default UserMarks;
