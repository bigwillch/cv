import React from 'react';
import { render, hydrate } from 'react-dom';
import { SideLoaderProvider } from 'Contexts';
import { App } from './App';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then((registration) => {
      console.log('SW registered: ', registration);
    }).catch((registrationError) => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}

const AppWithProviders = () => (
  <SideLoaderProvider>
    <App />
  </SideLoaderProvider>
);

const rootElement = document.querySelector('main');
if (rootElement.hasChildNodes()) {
  hydrate(<AppWithProviders />, rootElement);
} else {
  render(<AppWithProviders />, rootElement);
}
