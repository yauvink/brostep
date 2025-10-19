import { useEffect } from 'react';
import { STORAGE_KEYS } from '../constants/storage';
import { DEFAULT_GRADIENT } from '../constants/app.constants';
import { generateRandomGradient } from '../utils/appColor';

export const useAppColor = () => {
  useEffect(() => {
    const savedColor = window.localStorage.getItem(STORAGE_KEYS.APP_COLOR);
    const gradient = savedColor || DEFAULT_GRADIENT;
    document.body.style.background = gradient;
  }, []);

  const handleChangeAppColor = () => {
    const newGradient = generateRandomGradient();
    document.body.style.background = newGradient;
    window.localStorage.setItem(STORAGE_KEYS.APP_COLOR, newGradient);
  };

  return { handleChangeAppColor };
};
