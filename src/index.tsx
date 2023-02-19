import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.module.scss';
import {RouterProvider} from 'react-router-dom'
import {router} from './Router';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
