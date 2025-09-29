import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSelect from './common/LanguageSelect';

function AcceptTerms({ handleAcceptTerms }: { handleAcceptTerms: () => void }) {
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
            <LanguageSelect />
          </Box>
          <Typography>{t('terms.terms', { gameName: t('gameName') })}</Typography>
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
            {t('terms.accept')}
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
