import { FormControl, MenuItem, Select } from '@mui/material';
import { useApp } from '../../providers/AppProvider';
import { useTranslation } from 'react-i18next';
import { LanguageCode } from '../../constants/app.constants';

function LanguageSelect() {
  const { handleChangeAppLanguage } = useApp();
  const { i18n } = useTranslation();

  return (
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
  );
}
export default LanguageSelect;
