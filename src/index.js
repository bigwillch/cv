import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import store from 'Redux/store';
import App from './components/App';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(registration => {
      console.log('SW registered: ', registration);
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('main')
);