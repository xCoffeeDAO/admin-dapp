import { createRoot } from 'react-dom/client';
import './assets/sass/theme.scss';
import './assets/sass/_main.scss';
import React from 'react';

import App from './App';

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);
root.render(<App />);
