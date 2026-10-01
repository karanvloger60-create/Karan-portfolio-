import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Safe ServiceWorker registration with defensive error-catcher
if (typeof window !== 'undefined' && 'serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch((err) => {
      // Gracefully catch sandboxed iframe or restricted environment rejections
      console.debug('ServiceWorker notice:', err);
    });
  });
}

createRoot(document.getElementById('root')!).render(<App />);
