import { Box } from '@mui/material';
import { useGame } from '../../../../providers/GameProvider';
import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import User from './components/User';
import DetectingAnimation from '../DetectingAnimation';
import SelectedAnimation from '../../../common/SelectedAnimation';

function Users() {
  const { gameState } = useGame();
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(window.innerWidth);

  useLayoutEffect(() => {
    if (containerRef.current) {
      const windowWidth = window.innerWidth;
      const boxHeight = containerRef.current.offsetHeight;
      const result = Math.min(windowWidth, boxHeight);
      setWidth(result);
    }
  }, [containerRef]);

  const usersLength = useMemo(() => {
    return gameState?.users.length ?? 0;
  }, [gameState?.users.length]);

  const userPositions = useMemo(() => {
    const arr = new Array(usersLength).fill(0);
    return arr.map((_, i) => {
      const totalUsers = arr.length;
      const angleStep = (2 * Math.PI) / totalUsers;
      const angle = i * angleStep - Math.PI / 2;

      const windowWidth = width;
      const radius = (windowWidth - 120) / 2;

      // const max = 200 / usersLength;
      // const randomOffset = (Math.random() - 0.5) * max;
      const randomOffset = 0;

      const x = radius * Math.cos(angle) + randomOffset;
      const y = radius * Math.sin(angle) + randomOffset;

      return {
        x,
        y,
      };
    });
  }, [usersLength, width]);

  const positions = useMemo(() => {
    return userPositions?.map((el) => ({
      x: el.x,
      y: el.y,
    }));
  }, [userPositions]);

  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'absolute',
        width: `${width}px`,
        height: '100%',
        aspectRatio: '1/1',
        // border: '1px solid blue',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {gameState?.users?.map((user, i) => {
        return <User key={i} user={user} x={userPositions?.[i]?.x ?? 0} y={userPositions?.[i]?.y ?? -100} />;
      })}

      <SelectedAnimation />

      {positions && <DetectingAnimation positions={positions} />}
    </Box>
  );
}

export default Users;
