import { Box, Typography, Toolbar, IconButton, Paper, Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { iOsPadding } from '../utils/browser';
import tgStars from '../assets/tg_stars.svg';
import mark1 from '../assets/mark_1.svg';

function AddGame({ onClose }: { onClose: () => void }) {
  const { t } = useTranslation();
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
              {t('addGame.title')}
            </Typography>
          </Toolbar>
        </Box>
        <Box
          sx={{
            // mt: `${iOsPadding() + 70}px`,
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '20px',
            color: 'black',
          }}
        >
          <Paper
            elevation={3}
            sx={{
              width: '100%',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: '12px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '16px',
              }}
            >
              <Box
                sx={{
                  width: 80,
                  minWidth: 80,
                  minHeight: 80,
                  height: 80,
                  maxHeight: 80,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '48px',
                  flexShrink: 0,
                }}
              >
                🎮
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 'bold',
                    fontSize: '1.25rem',
                    textAlign: 'left',
                  }}
                >
                  {t('addGame.customRoom.title')}
                </Typography>
                <Typography
                  sx={{
                    fontSize: '0.875rem',
                    color: '#666',
                    textAlign: 'left',
                  }}
                >
                  {t('addGame.customRoom.description')}
                </Typography>
              </Box>
            </Box>
            <Button
              disabled
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: '#0088cc',
                color: 'white',
                textTransform: 'none',
                borderRadius: '8px',
                padding: '10px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                '&:hover': {
                  backgroundColor: '#006699',
                },
              }}
            >
              <img width={20} height={20} src={tgStars} alt="tg_stars" />
              {t('addGame.customRoom.price')}
            </Button>
          </Paper>

          <Paper
            elevation={3}
            sx={{
              width: '100%',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: '12px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '16px',
              }}
            >
              <Box
                sx={{
                  width: 80,
                  minWidth: 80,
                  minHeight: 80,
                  height: 80,
                  maxHeight: 80,
                  display: 'flex',
                }}
              >
                <img width={80} height={80} src={mark1} alt="mark_1" />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 'bold',
                    fontSize: '1.25rem',
                    textAlign: 'left',
                  }}
                >
                  {t('addGame.shield.title')}
                </Typography>
                <Typography
                  sx={{
                    fontSize: '0.875rem',
                    color: '#666',
                    textAlign: 'left',
                  }}
                >
                  {t('addGame.shield.description')}
                </Typography>
              </Box>
            </Box>
            <Button
              disabled
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: '#0088cc',
                color: 'white',
                textTransform: 'none',
                borderRadius: '8px',
                padding: '10px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                '&:hover': {
                  backgroundColor: '#006699',
                },
              }}
            >
              <img width={20} height={20} src={tgStars} alt="tg_stars" />
              {t('addGame.shield.price')}
            </Button>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}

export default AddGame;
