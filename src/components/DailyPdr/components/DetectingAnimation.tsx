import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { useGame } from '../../../providers/GameProvider';
function DetectingAnimation() {
  const { gameState } = useGame();
  const isShow = useMemo(() => {
    if (gameState) {
      return gameState.currentState === 'detecting';
    }
    return false;
  }, [gameState]);

  if (!isShow) return null;

  return (
    <Box
      sx={{
        // border: '2px solid red',
        width: '100%',
        height: '100%',
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 20000,
      }}
    >
      <motion.div
        className="absolute"
        animate={{
          x: [-70, 80, 120, 40, 0, -70],
          y: [-70, -30, 40, 60, -20, -70],
          rotate: [0, 20, -20, 10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <Box
          sx={{
            // border: '1px solid green',
            fontSize: '100px',
          }}
        >
          🔍︎
        </Box>
      </motion.div>
    </Box>
  );
}

export default DetectingAnimation;
