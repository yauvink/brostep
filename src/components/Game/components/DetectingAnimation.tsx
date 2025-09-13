import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { useGame } from '../../../providers/GameProvider';

function DetectingAnimation({
  positions,
}: {
  positions: {
    x: number;
    y: number;
  }[];
}) {
  const { gameState } = useGame();

  const xArray = useMemo(() => {
    const xArray = positions.map((position) => position.x);
    return [...xArray, xArray[0] ?? 0];
  }, [positions]);
  // console.log('xArray', xArray);

  const yArray = useMemo(() => {
    const yArray = positions.map((position) => position.y);
    return [...yArray, yArray[0] ?? 0];
  }, [positions]);
  // console.log('yArray', yArray);

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
        '& .motionDiv': {
          // border: '1px solid red',
        },
      }}
    >
      <motion.div
        className="motionDiv"
        animate={{
          // x: [-70, 80, 120, 40, 0, -70],
          // y: [-70, -30, 40, 60, -20, -70],
          x: xArray,
          y: yArray,
          // rotate: [0, 20, -20, 10, 0],
          rotate: [0, 20, -20, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          // ease: 'easeInOut',
          ease: 'linear',
          // repeatDelay: 1,
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
