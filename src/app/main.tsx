import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App.tsx';
import GlobalStyles from '../styles/GlobalStyles.ts';
import store from '../store/store.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
    <GlobalStyles />
  </StrictMode>
);
