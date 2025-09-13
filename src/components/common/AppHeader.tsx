import React from 'react';
import { Person } from '@mui/icons-material';
import { AppBar, Avatar, IconButton, Toolbar, Typography, Select, MenuItem, FormControl } from '@mui/material';
import { APP_VIEW, AppLanguages, GAME_NAME } from '../../constants/app.constants';
import { useApp } from '../../providers/AppProvider';
import { iOsPadding } from '../../utils/browser';
import { useTelegram } from '../../providers/TelegramProvider/useTelegram';
import { useTranslation } from 'react-i18next';

function AppHeader() {
  const { telegramUser } = useTelegram();
  const { setAppView, handleChangeAppLanguage } = useApp();
  const { t, i18n } = useTranslation();

  return (
    <AppBar
      // position="static"
      sx={{
        paddingTop: `${iOsPadding()}px`,
        // backgroundColor: 'transparent',
        backgroundColor: 'rgba(255,255,255,1)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
      }}
    >
      <Toolbar sx={{ height: '70px' }}>
        <Typography variant="h6" sx={{ color: '#333', flexGrow: 1, fontWeight: 'bold', lineHeight: 'normal' }}>
          {t('gameTitle', {gameName: GAME_NAME})}
        </Typography>
        <FormControl
          sx={{
            marginRight: '10px',
            minWidth: 80,
          }}
          size="small"
        >
          <Select
            value={i18n.language}
            onChange={(e) => handleChangeAppLanguage(e.target.value as AppLanguages)}
            sx={{
              color: '#333',
              border: '2px solid rgba(0,0,0,0.1)',
              borderRadius: '25px',
              height: '50px',
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
              '& .MuiSelect-select': {
                padding: '12px 14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              },
            }}
          >
            <MenuItem value={AppLanguages.EN}>EN</MenuItem>
            <MenuItem value={AppLanguages.RU}>RU</MenuItem>
          </Select>
        </FormControl>
        <IconButton
          color="inherit"
          onClick={() => setAppView(APP_VIEW.PROFILE)}
          sx={{
            color: '#333',
            padding: 0,
            '&:hover': {
              backgroundColor: 'rgba(0,0,0,0.1)',
            },
          }}
        >
          {telegramUser?.photo_url ? (
            <Avatar
              src={telegramUser.photo_url}
              alt="Profile"
              sx={{
                width: 50,
                height: 50,
                border: '2px solid rgba(0,0,0,0.1)',
              }}
            />
          ) : (
            <Person />
          )}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default React.memo(AppHeader);
