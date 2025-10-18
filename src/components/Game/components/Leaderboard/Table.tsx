import { Box, Typography, CircularProgress } from '@mui/material';
import { useMemo } from 'react';
import type { GameScore } from '../../../../services/requests';

interface LeaderboardTableProps {
  scores?: GameScore[];
  loading: boolean;
}

function LeaderboardTable({ scores, loading }: LeaderboardTableProps) {
  const tableValues = useMemo(() => {
    if (!scores) return [];

    const data = scores.map((score) => ({
      name: `${score.user.firstName || ''} ${score.user.lastName || ''}`.trim(),
      points: score.score,
    }));

    return data.sort((a, b) => b.points - a.points);
  }, [scores]);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '200px',
        }}
      >
        <CircularProgress sx={{ color: 'red' }} />
      </Box>
    );
  }

  if (!tableValues || tableValues.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '200px',
          color: 'black',
        }}
      >
        <Typography>No data available</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          borderBottom: '2px solid black',
          padding: '10px',
          width: '100%',
          display: 'flex',
          textAlign: 'center',
          fontWeight: 700,
        }}
      >
        <Box sx={{ minWidth: '30px', color: 'black' }}>#</Box>
        <Typography
          sx={{
            width: '100%',
            fontWeight: 700,
            textAlign: 'left',
            ml: '10px',
            color: 'black',
          }}
        >
          Name
        </Typography>
        <Box sx={{ minWidth: '70px', color: 'black' }}>Points</Box>
      </Box>
      {tableValues.map((el, i, arr) => (
        <Box
          key={i}
          sx={{
            borderBottom: i < arr.length - 1 ? '1px solid rgba(0,0,0,0.5)' : 'none',
            padding: '10px',
            width: '100%',
            display: 'flex',
            textAlign: 'center',
            color: 'black',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              minWidth: '30px',
              border: '2px solid red',
              borderRadius: '50%',
              height: '30px',
              color: 'red',
              fontWeight: 900,
              textShadow: '1px 2px 2px black',
            }}
          >
            {i + 1}
          </Box>
          <Typography
            sx={{
              width: '100%',
              textAlign: 'left',
              ml: '10px',
            }}
          >
            {el.name}
          </Typography>
          <Box sx={{ minWidth: '70px' }}>{el.points}</Box>
        </Box>
      ))}
    </Box>
  );
}

export default LeaderboardTable;
