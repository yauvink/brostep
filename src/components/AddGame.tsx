import { Box, Typography, Toolbar, IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { iOsPadding } from '../utils/browser';

function AddGame({ onClose }: { onClose: () => void }) {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          maxHeight: '100%',
          width: '100%',
          maxWidth: '480px',
          position: 'fixed',
          top: 0,
          bottom: 0,
          display: 'flex',
          flexDirection: 'column',
          background: '#fff',
          overflow: 'auto',
          zIndex: 1000,
        }}
      >
        <Box
          // position="static"
          sx={{
            paddingTop: `${iOsPadding()}px`,
            backgroundColor: 'lightgrey',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            borderBottom: '1px solid rgba(0,0,0,0.1)',
            marginTop: '70px',
          }}
        >
          <Toolbar sx={{ height: '70px' }}>
            <IconButton
              edge="start"
              onClick={() => {
                onClose();
              }}
              sx={{ mr: 2, color: 'black' }}
            >
              <ArrowBack />
            </IconButton>
            <Typography variant="h6" sx={{ color: '#333', flexGrow: 1, fontWeight: 'bold' }}>
              Add game
            </Typography>
          </Toolbar>
        </Box>
        <Box
          sx={{
            // mt: `${iOsPadding() + 70}px`,
            // padding: '20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            color: 'black',
          }}
        >
          Coming soon...
          <br />
          <button>чтоб у бота держались штаны и сервер стоял</button>
        </Box>
      </Box>
    </Box>
  );
}

export default AddGame;
