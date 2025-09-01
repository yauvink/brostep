import { Box, Typography, AppBar, Toolbar, IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useTelegram } from '../providers/TelegramProvider/useTelegram';
import { useApp } from '../providers/AppProvider';
import { APP_VIEW } from '../constants/app.constants';
import { iOsPadding } from '../utils/browser';

function Profile() {
  const { webApp, telegramUser } = useTelegram();
  const { setAppView } = useApp();
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
          color: 'red',
          overflow: 'auto',
        }}
      >
        <AppBar
          // position="static"
          sx={{
            paddingTop: `${iOsPadding()}px`,
            backgroundColor: 'rgba(255,255,255,0.6)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            borderBottom: '1px solid rgba(0,0,0,0.1)',
          }}
        >
          <Toolbar sx={{ height: '70px' }}>
            <IconButton edge="start" onClick={() => setAppView(APP_VIEW.MAIN)} sx={{ mr: 2, color: 'black' }}>
              <ArrowBack />
            </IconButton>
            <Typography variant="h6" sx={{ color: '#333', flexGrow: 1, fontWeight: 'bold' }}>
              Profile
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            mt: `${iOsPadding() + 70}px`,
            padding: '20px',
          }}
        >
          <br />
          <div>initDataUnsafe.start_param: {webApp?.initDataUnsafe.start_param}</div>
          <br />
          {webApp && telegramUser && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 3,
                  padding: 3,
                  backgroundColor: 'rgba(255,255,255,0.8)',
                  borderRadius: 3,
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                }}
              >
                {telegramUser.photo_url && (
                  <img
                    src={telegramUser.photo_url}
                    alt="Profile"
                    style={{
                      width: 120,
                      height: 120,
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '3px solid rgba(0,0,0,0.1)',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                    }}
                  />
                )}
                <Box>
                  <Typography variant="h4" sx={{ color: '#333', mb: 1, fontWeight: 'bold' }}>
                    {telegramUser.first_name} {telegramUser.last_name}
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#666', mb: 1 }}>
                    @{telegramUser.username}
                  </Typography>
                  {telegramUser.is_premium && (
                    <Typography variant="body1" sx={{ color: '#FFD700', fontWeight: 'bold' }}>
                      ⭐ Premium User
                    </Typography>
                  )}
                </Box>
              </Box>

              <Box
                sx={{
                  backgroundColor: 'rgba(255,255,255,0.8)',
                  borderRadius: 3,
                  padding: 3,
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                }}
              >
                <Typography variant="h6" sx={{ color: '#333', mb: 3, fontWeight: 'bold' }}>
                  Personal Information
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ color: '#666' }}>First Name:</Typography>
                    <Typography sx={{ color: '#333', fontWeight: 'medium' }}>{telegramUser.first_name}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ color: '#666' }}>Last Name:</Typography>
                    <Typography sx={{ color: '#333', fontWeight: 'medium' }}>
                      {telegramUser.last_name || 'N/A'}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ color: '#666' }}>Username:</Typography>
                    <Typography sx={{ color: '#333', fontWeight: 'medium' }}>@{telegramUser.username}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ color: '#666' }}>Premium Status:</Typography>
                    <Typography sx={{ color: telegramUser.is_premium ? '#FFD700' : '#666', fontWeight: 'medium' }}>
                      {telegramUser.is_premium ? 'Premium' : 'Standard'}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box
                sx={{
                  backgroundColor: 'rgba(255,255,255,0.8)',
                  borderRadius: 3,
                  padding: 3,
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                }}
              >
                <Typography variant="h6" sx={{ color: '#333', mb: 3, fontWeight: 'bold' }}>
                  Account Details
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ color: '#666' }}>Telegram ID:</Typography>
                    <Typography sx={{ color: '#333', fontWeight: 'medium' }}>{telegramUser.id}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ color: '#666' }}>Database ID:</Typography>
                    <Typography sx={{ color: '#333', fontWeight: 'medium' }}>{telegramUser.id}</Typography>
                  </Box>
                  {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ color: '#666' }}>Reference Code:</Typography>
                    <Typography sx={{ color: '#333', fontWeight: 'medium' }}>{telegramUser.ref_code || 'N/A'}</Typography>
                  </Box> */}
                  {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ color: '#666' }}>Member Since:</Typography>
                    <Typography sx={{ color: '#333', fontWeight: 'medium' }}>
                      {telegramUser.createdAt
                        ? new Date(telegramUser.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })
                        : 'N/A'}
                    </Typography>
                  </Box> */}
                  {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ color: '#666' }}>Last Updated:</Typography>
                    <Typography sx={{ color: '#333', fontWeight: 'medium' }}>
                      {telegramUser.updatedAt
                        ? new Date(telegramUser.updatedAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })
                        : 'N/A'}
                    </Typography>
                  </Box> */}
                </Box>
              </Box>

              <Box
                sx={{
                  backgroundColor: 'rgba(255,255,255,0.8)',
                  borderRadius: 3,
                  padding: 3,
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                }}
              >
                <Typography variant="h6" sx={{ color: '#333', mb: 3, fontWeight: 'bold' }}>
                  Telegram WebApp Info
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ color: '#666' }}>Platform:</Typography>
                    <Typography sx={{ color: '#333', fontWeight: 'medium' }}>{webApp.platform}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ color: '#666' }}>Version:</Typography>
                    <Typography sx={{ color: '#333', fontWeight: 'medium' }}>{webApp.version}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ color: '#666' }}>Color Scheme:</Typography>
                    <Typography sx={{ color: '#333', fontWeight: 'medium' }}>{webApp.colorScheme}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ color: '#666' }}>Viewport Height:</Typography>
                    <Typography sx={{ color: '#333', fontWeight: 'medium' }}>{webApp.viewportHeight}px</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ color: '#666' }}>Is Expanded:</Typography>
                    <Typography sx={{ color: '#333', fontWeight: 'medium' }}>{String(webApp.isExpanded)}</Typography>
                  </Box>
                </Box>
              </Box>

              <Box
                sx={{
                  backgroundColor: 'rgba(255,255,255,0.8)',
                  borderRadius: 3,
                  padding: 3,
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                }}
              >
                <Typography variant="h6" sx={{ color: '#333', mb: 3, fontWeight: 'bold' }}>
                  Telegram Settings
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ color: '#666' }}>Language:</Typography>
                    <Typography sx={{ color: '#333', fontWeight: 'medium' }}>
                      {webApp.initDataUnsafe?.user?.language_code || 'N/A'}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ color: '#666' }}>Can Write to PM:</Typography>
                    <Typography sx={{ color: '#333', fontWeight: 'medium' }}>
                      {String(webApp.initDataUnsafe?.user?.allows_write_to_pm || false)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ color: '#666' }}>Added to Menu:</Typography>
                    <Typography sx={{ color: '#333', fontWeight: 'medium' }}>
                      {String(webApp.initDataUnsafe?.user?.added_to_attachment_menu || false)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ color: '#666' }}>Premium Status:</Typography>
                    <Typography sx={{ color: '#333', fontWeight: 'medium' }}>
                      {String(webApp.initDataUnsafe?.user?.is_premium || false)}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box
                sx={{
                  backgroundColor: 'rgba(255,255,255,0.8)',
                  borderRadius: 3,
                  padding: 3,
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                }}
              >
                <Typography variant="h6" sx={{ color: '#333', mb: 3, fontWeight: 'bold' }}>
                  Theme & Colors
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ color: '#666' }}>Header Color:</Typography>
                    <Typography sx={{ color: '#333', fontWeight: 'medium' }}>{webApp.headerColor}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ color: '#666' }}>Background Color:</Typography>
                    <Typography sx={{ color: '#333', fontWeight: 'medium' }}>{webApp.backgroundColor}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ color: '#666' }}>Closing Confirmation:</Typography>
                    <Typography sx={{ color: '#333', fontWeight: 'medium' }}>
                      {String(webApp.isClosingConfirmationEnabled)}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default Profile;
