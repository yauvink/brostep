import { Box, Button, FormControl, MenuItem, Select, Typography } from '@mui/material';
import { useState } from 'react';
import { LanguageCode } from '../constants/app.constants';
import type { i18n } from 'i18next';
import { useTranslation } from 'react-i18next';

function AcceptTerms({
  handleAcceptTerms,
  handleChangeAppLanguage,
  i18n,
}: {
  handleAcceptTerms: () => void;
  handleChangeAppLanguage: (language: LanguageCode) => void;
  i18n: i18n;
}) {
  const [isNotAccepted, setIsNotAccepted] = useState(false);
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100%',
      }}
    >
      {isNotAccepted ? (
        <Box>
          <Typography>{t('terms.haveANiceDay')}</Typography>
        </Box>
      ) : (
        <Box
          sx={{
            fontSize: '20px',
            margin: '30px',
            textAlign: 'center',
          }}
        >
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-end',
              mb: '30px',
            }}
          >
            <FormControl
              sx={{
                marginRight: '10px',
                minWidth: 80,
              }}
              size="small"
            >
              <Select
                value={i18n.language}
                onChange={(e) => handleChangeAppLanguage(e.target.value as LanguageCode)}
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
                <MenuItem value={LanguageCode.EN}>EN</MenuItem>
                <MenuItem value={LanguageCode.RU}>RU</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Typography>{t('terms.terms')}</Typography>
          <Box height={30}></Box>

          <Button
            onClick={handleAcceptTerms}
            sx={{
              backgroundColor: 'green',
              padding: '10px 40px',
              color: 'white',
              '&:hover': {
                backgroundColor: 'green',
              },
            }}
          >
            {t('accept')}
          </Button>
          <Box height={10}></Box>
          <Button
            onClick={() => {
              setIsNotAccepted(true);
            }}
            sx={{
              padding: '10px 40px',
              backgroundColor: 'red',
              color: 'white',
              '&:hover': {
                backgroundColor: 'red',
              },
            }}
          >
            {t('terms.decline')}
          </Button>
        </Box>
      )}
    </Box>
  );
}
export default AcceptTerms;
