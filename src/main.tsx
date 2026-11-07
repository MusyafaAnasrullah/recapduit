import React from 'react';
import ReactDOM from 'react-dom/client';
import { FinanceProvider } from './context/FinanceContext';
import { AppContent } from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <FinanceProvider>
      <AppContent />
    </FinanceProvider>
  </React.StrictMode>
);
