import { Box, Typography, AppBar, Toolbar, IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useTelegram } from '../providers/TelegramProvider/useTelegram';
import { useApp } from '../providers/AppProvider';
import { APP_VIEW } from '../constants/app.constants';

function Profile() {
  const { webApp } = useTelegram();
  const { userData, setAppView } = useApp();
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
          backgroundColor: '#0E111B',
        }}
      >
        <AppBar
          // position="static"
          sx={{
            backgroundColor: 'rgba(14, 17, 27, 0.9)',
            backdropFilter: 'blur(10px)',
            boxShadow: 'none',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={() => setAppView(APP_VIEW.MAIN)} sx={{ mr: 2 }}>
              <ArrowBack />
            </IconButton>
            <Typography variant="h6" sx={{ color: 'white', flexGrow: 1 }}>
              Profile
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            mt: '57px',
            padding: '20px',
          }}
        >
          {webApp && userData && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 3,
                  padding: 3,
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  borderRadius: 3,
                  backdropFilter: 'blur(10px)',
                }}
              >
                {userData.photo_url && (
                  <img
                    src={userData.photo_url}
                    alt="Profile"
                    style={{
                      width: 120,
                      height: 120,
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '3px solid rgba(255,255,255,0.2)',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                    }}
                  />
                )}
                <Box>
                  <Typography variant="h4" sx={{ color: 'white', mb: 1, fontWeight: 'bold' }}>
                    {userData.first_name} {userData.last_name}
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#888', mb: 1 }}>
                    @{userData.username}
                  </Typography>
                  {userData.is_premium && (
                    <Typography variant="body1" sx={{ color: '#FFD700', fontWeight: 'bold' }}>
                      ⭐ Premium User
                    </Typography>
                  )}
                </Box>
              </Box>

              <Box
                sx={{
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  borderRadius: 3,
                  padding: 3,
                  backdropFilter: 'blur(10px)',
                }}
              >
                <Typography variant="h6" sx={{ color: 'white', mb: 3, fontWeight: 'bold' }}>
                  Personal Information
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ color: '#ccc' }}>First Name:</Typography>
                    <Typography sx={{ color: 'white', fontWeight: 'medium' }}>{userData.first_name}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ color: '#ccc' }}>Last Name:</Typography>
                    <Typography sx={{ color: 'white', fontWeight: 'medium' }}>{userData.last_name || 'N/A'}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ color: '#ccc' }}>Username:</Typography>
                    <Typography sx={{ color: 'white', fontWeight: 'medium' }}>@{userData.username}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ color: '#ccc' }}>Premium Status:</Typography>
                    <Typography sx={{ color: userData.is_premium ? '#FFD700' : '#ccc', fontWeight: 'medium' }}>
                      {userData.is_premium ? 'Premium' : 'Standard'}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box
                sx={{
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  borderRadius: 3,
                  padding: 3,
                  backdropFilter: 'blur(10px)',
                }}
              >
                <Typography variant="h6" sx={{ color: 'white', mb: 3, fontWeight: 'bold' }}>
                  Account Details
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ color: '#ccc' }}>Telegram ID:</Typography>
                    <Typography sx={{ color: 'white', fontWeight: 'medium' }}>{userData.telegram_id}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ color: '#ccc' }}>Database ID:</Typography>
                    <Typography sx={{ color: 'white', fontWeight: 'medium' }}>{userData.id}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ color: '#ccc' }}>Reference Code:</Typography>
                    <Typography sx={{ color: 'white', fontWeight: 'medium' }}>{userData.ref_code || 'N/A'}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ color: '#ccc' }}>Member Since:</Typography>
                    <Typography sx={{ color: 'white', fontWeight: 'medium' }}>
                      {userData.created_at
                        ? new Date(userData.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })
                        : 'N/A'}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ color: '#ccc' }}>Last Updated:</Typography>
                    <Typography sx={{ color: 'white', fontWeight: 'medium' }}>
                      {userData.updated_at
                        ? new Date(userData.updated_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })
                        : 'N/A'}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box
                sx={{
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  borderRadius: 3,
                  padding: 3,
                  backdropFilter: 'blur(10px)',
                }}
              >
                <Typography variant="h6" sx={{ color: 'white', mb: 3, fontWeight: 'bold' }}>
                  Telegram WebApp Info
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ color: '#ccc' }}>Platform:</Typography>
                    <Typography sx={{ color: 'white', fontWeight: 'medium' }}>{webApp.platform}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ color: '#ccc' }}>Version:</Typography>
                    <Typography sx={{ color: 'white', fontWeight: 'medium' }}>{webApp.version}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ color: '#ccc' }}>Color Scheme:</Typography>
                    <Typography sx={{ color: 'white', fontWeight: 'medium' }}>{webApp.colorScheme}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ color: '#ccc' }}>Viewport Height:</Typography>
                    <Typography sx={{ color: 'white', fontWeight: 'medium' }}>{webApp.viewportHeight}px</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ color: '#ccc' }}>Is Expanded:</Typography>
                    <Typography sx={{ color: 'white', fontWeight: 'medium' }}>{String(webApp.isExpanded)}</Typography>
                  </Box>
                </Box>
              </Box>

              <Box
                sx={{
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  borderRadius: 3,
                  padding: 3,
                  backdropFilter: 'blur(10px)',
                }}
              >
                <Typography variant="h6" sx={{ color: 'white', mb: 3, fontWeight: 'bold' }}>
                  Telegram Settings
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ color: '#ccc' }}>Language:</Typography>
                    <Typography sx={{ color: 'white', fontWeight: 'medium' }}>
                      {webApp.initDataUnsafe?.user?.language_code || 'N/A'}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ color: '#ccc' }}>Can Write to PM:</Typography>
                    <Typography sx={{ color: 'white', fontWeight: 'medium' }}>
                      {String(webApp.initDataUnsafe?.user?.allows_write_to_pm || false)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ color: '#ccc' }}>Added to Menu:</Typography>
                    <Typography sx={{ color: 'white', fontWeight: 'medium' }}>
                      {String(webApp.initDataUnsafe?.user?.added_to_attachment_menu || false)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ color: '#ccc' }}>Premium Status:</Typography>
                    <Typography sx={{ color: 'white', fontWeight: 'medium' }}>
                      {String(webApp.initDataUnsafe?.user?.is_premium || false)}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box
                sx={{
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  borderRadius: 3,
                  padding: 3,
                  backdropFilter: 'blur(10px)',
                }}
              >
                <Typography variant="h6" sx={{ color: 'white', mb: 3, fontWeight: 'bold' }}>
                  Theme & Colors
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ color: '#ccc' }}>Header Color:</Typography>
                    <Typography sx={{ color: 'white', fontWeight: 'medium' }}>{webApp.headerColor}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ color: '#ccc' }}>Background Color:</Typography>
                    <Typography sx={{ color: 'white', fontWeight: 'medium' }}>{webApp.backgroundColor}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ color: '#ccc' }}>Closing Confirmation:</Typography>
                    <Typography sx={{ color: 'white', fontWeight: 'medium' }}>
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
