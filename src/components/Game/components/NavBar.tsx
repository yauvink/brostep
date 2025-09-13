import { Box, Button } from '@mui/material';
import { useGame } from '../../../providers/GameProvider';
import { useMemo, useRef } from 'react';

function NavBar({ onAddGame }: { onAddGame: () => void }) {
  const { rooms, setSelectedGameRoom, selectedGameRoom } = useGame();

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const userRooms = useMemo(() => {
    // return rooms.sort((a) => (a.id === selectedGameRoom ? -1 : 1));
    return rooms;
  }, [rooms]);

  const handleTabClick = (tabValue: string, buttonElement: HTMLElement) => {
    setSelectedGameRoom(tabValue);
    console.log('buttonElement', buttonElement);

    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const containerRect = container.getBoundingClientRect();
      const buttonRect = buttonElement.getBoundingClientRect();

      // Calculate the scroll position to center the button
      const scrollLeft = buttonElement.offsetLeft - containerRect.width / 2 + buttonRect.width / 2;

      container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth',
      });
    }
  };

  return (
    <Box
      sx={{
        // border: '1px solid red',
        width: '100%',
      }}
    >
      <Box
        ref={scrollContainerRef}
        sx={{
          display: 'flex',
          gap: '10px',
          padding: '10px 20px',
          overflowX: 'auto',
          transform: 'rotateX(180deg)',
          '& > *': {
            transform: 'rotateX(180deg)',
          },
        }}
      >
        <Button
          onClick={onAddGame}
          variant={'contained'}
          sx={{
            minWidth: 'max-content',
            backgroundColor: 'green',
          }}
        >
          Add +
        </Button>
        {userRooms.map((room) => (
          <Button
            key={room.id}
            variant={selectedGameRoom === room.id ? 'contained' : 'outlined'}
            onClick={(e) => handleTabClick(room.id, e.currentTarget)}
            sx={{
              minWidth: 'max-content',
            }}
          >
            {room.chatTitle}
          </Button>
        ))}
      </Box>
    </Box>
  );
}

export default NavBar;
