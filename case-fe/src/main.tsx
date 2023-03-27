import React from 'react'
import ReactDOM from 'react-dom/client'
import { NavLink, BrowserRouter } from "react-router-dom";
import App from './App'
import { origin } from './init.js';
import './index.css'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <div>
      <App />
    </div>
  </React.StrictMode>,
)
