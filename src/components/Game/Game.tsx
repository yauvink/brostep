import { Box } from '@mui/material';
// import UserAvatar from '../common/UserAvatar';

function Game() {
  // const BOARD_WIDTH = 8;
  // const rows = new Array(BOARD_WIDTH).fill(0).map((_, index) => index);
  // const columns = new Array(BOARD_WIDTH).fill(0).map((_, index) => index);

  // const userPosition = {
  //   x: 0,
  //   y: 5,
  // };

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: 'white',
        // border: '1px solid red',
      }}
    >
      <Box
        sx={{
          // border: '1px solid blue',
          width: '100%',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* {rows.map((row, rowIndex) => (
          <Box key={row} sx={{ display: 'flex', width: '100%' }}>
            {columns.map((column, columnIndex) => {
              const isUserHere = rowIndex === userPosition.x && columnIndex === userPosition.y;
              return (
                <Box
                  key={column}
                  sx={{
                    aspectRatio: '1/1',
                    color: 'green',
                    width: '100%',
                    backgroundColor: 'white',
                    border: '1px solid lightgrey',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {isUserHere && <UserAvatar />}
                </Box>
              );
            })}
          </Box>
        ))} */}
      </Box>
    </Box>
  );
}

export default Game;
