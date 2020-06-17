import React from 'react';
import { render } from 'react-dom';
import { App } from './App';
import { SideLoaderProvider } from 'Contexts';

render(
  <SideLoaderProvider>
    <App />
  </SideLoaderProvider>,
  document.querySelector('main')
);