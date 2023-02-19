import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.module.scss';
import { RouterProvider } from 'react-router-dom'
import { router } from './Router';
import { Provider } from 'react-redux';
import { store } from './redux/store';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
