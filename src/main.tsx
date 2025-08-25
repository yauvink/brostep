import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

import packageJson from '../package.json';

console.log(packageJson.version);

createRoot(document.getElementById('root')!).render(<App />);
