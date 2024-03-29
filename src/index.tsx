import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { EmojiProvider } from './providers';
import { MantineProvider as FrameworkProvider } from '@mantine/core';
import EmojiPicker from './components/EmojiPicker';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <FrameworkProvider withGlobalStyles withNormalizeCSS>
      <EmojiProvider>
        <EmojiPicker theme={'light'} />
      </EmojiProvider>
    </FrameworkProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
