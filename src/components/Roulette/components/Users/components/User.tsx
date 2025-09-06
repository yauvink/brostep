import { Box } from '@mui/material';
import UserAvatar from '../../../../common/UserAvatar';
import type { GameUser } from '../../../../../providers/GameProvider/GameProvider';
import ScoreChangeAnimation from '../../../../DailyPdr/components/Users/components/ScoreChangeAnimation';

function User({ user, x, y }: { user: GameUser; x: number; y: number }) {
  return (
    <Box
      sx={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        transform: 'translate(-50%, -50%)',
        zIndex: 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
      }}
    >
      <UserAvatar user={user} />

      <ScoreChangeAnimation currentUser={user} />
    </Box>
  );
}

export default User;
