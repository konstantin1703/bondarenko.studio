import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './styles/tokens.css';
import './styles/globals.css';

const rootElement = document.getElementById('home-v2-root');

if (!rootElement) {
  throw new Error('Homepage preview root element was not found.');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
