import { Tabs, Tab } from '@mui/material';
import {
  GameScoreType,
  getTotalStats,
  getWeeklyStats,
  getMonthlyStats,
  getYearlyStats,
  type GameScore,
} from '../../../../services/requests';
import LeaderboardTable from './Table';
import { Box, Typography, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import LeaderboardButton from './LeaderboardButton';
import { useGame } from '../../../../providers/GameProvider';
import { getCurrentYear, getCurrentMonth, getCurrentWeek } from '../../../../utils/date';

interface ScoresState {
  [GameScoreType.TOTAL]?: GameScore[];
  [GameScoreType.YEARLY]?: GameScore[];
  [GameScoreType.MONTHLY]?: GameScore[];
  [GameScoreType.WEEKLY]?: GameScore[];
}

interface LoadingState {
  [GameScoreType.TOTAL]: boolean;
  [GameScoreType.YEARLY]: boolean;
  [GameScoreType.MONTHLY]: boolean;
  [GameScoreType.WEEKLY]: boolean;
}

function Leaderboard() {
  const { t } = useTranslation();
  const { selectedGameRoom } = useGame();
  const scoresFetchedGameRoomRef = useRef(selectedGameRoom);
  const [isOpen, setIsOpen] = useState(false);
  const [scoreType, setScoreType] = useState<GameScoreType>(GameScoreType.WEEKLY);
  const [scores, setScores] = useState<ScoresState>({});
  const [loading, setLoading] = useState<LoadingState>({
    [GameScoreType.TOTAL]: false,
    [GameScoreType.YEARLY]: false,
    [GameScoreType.MONTHLY]: false,
    [GameScoreType.WEEKLY]: false,
  });

  const fetchScores = async (type: GameScoreType, gameRoomId: string) => {
    setLoading((prev) => ({ ...prev, [scoreType]: true }));
    try {
      let response;
      const currentYear = getCurrentYear();
      const currentMonth = getCurrentMonth();
      const currentWeek = getCurrentWeek();

      switch (type) {
        case GameScoreType.TOTAL:
          response = await getTotalStats(gameRoomId);
          break;
        case GameScoreType.YEARLY:
          response = await getYearlyStats(gameRoomId, currentYear);
          break;
        case GameScoreType.MONTHLY:
          response = await getMonthlyStats(gameRoomId, currentYear, currentMonth);
          break;
        case GameScoreType.WEEKLY:
          response = await getWeeklyStats(gameRoomId, currentYear, currentWeek);
          break;
      }
      setScores((prev) => ({ ...prev, [type]: response.data }));
    } catch (error) {
      console.error(`Failed to fetch ${type} scores:`, error);
    } finally {
      setLoading((prev) => ({ ...prev, [type]: false }));
    }
  };

  useEffect(() => {
    if (isOpen && selectedGameRoom) {
      console.log('selectedGameRoom', 1, selectedGameRoom);
      if (scoresFetchedGameRoomRef.current !== selectedGameRoom) {
        setScores({});
        scoresFetchedGameRoomRef.current = selectedGameRoom;
      }
      if (!loading[scoreType] && !scores[scoreType]) {
        fetchScores(scoreType, selectedGameRoom);
      }
    }
  }, [isOpen, scoreType, selectedGameRoom, scores, loading]);

  useEffect(() => {
    if (!isOpen) {
      setScores({});
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  return !isOpen ? (
    <LeaderboardButton onClick={() => setIsOpen(true)} />
  ) : (
    <Box
      sx={{
        display: 'flex',
        position: 'absolute',
        zIndex: 900,
        top: 0,
        left: 10,
        right: 10,
        bottom: -200,
        backgroundColor: 'rgba(255,255,255,0.95)',
      }}
    >
      <IconButton
        color="inherit"
        onClick={handleClose}
        sx={{
          color: '#333',
          padding: 0,
          border: '2px solid rgba(0,0,0,0.1)',
          position: 'absolute',
          top: '10px',
          right: '20px',
          width: '50px',
          height: '50px',
          marginRight: '10px',
          '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.1)',
          },
        }}
      >
        <Close />
      </IconButton>
      <Box
        sx={{
          mt: `10px`,
          padding: '20px',
          width: '100%',
        }}
      >
        <Typography variant="h6" sx={{ color: '#333', flexGrow: 1, fontWeight: 'bold' }}>
          {t('leaderboard', { gameName: t('gameName') })}
        </Typography>

        <Tabs
          value={scoreType}
          onChange={(_, newValue) => setScoreType(newValue)}
          sx={{
            mb: 2,
            '& .MuiTab-root': {
              fontWeight: 600,
            },
          }}
          variant="fullWidth"
        >
          <Tab label={t('weekly')} value={GameScoreType.WEEKLY} />
          <Tab label={t('monthly')} value={GameScoreType.MONTHLY} />
          <Tab label={t('yearly')} value={GameScoreType.YEARLY} />
          <Tab label={t('total')} value={GameScoreType.TOTAL} />
        </Tabs>
        <LeaderboardTable scores={scores[scoreType]} loading={loading[scoreType]} />
      </Box>
    </Box>
  );
}

export default Leaderboard;
