import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import './i18n';

import packageJson from '../package.json';

console.log('>>>>>>>>>>> release version:', packageJson.version, '<<<<<<<<<<<<<');

createRoot(document.getElementById('root')!).render(<App />);
