import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { origin } from './init.js';
import './index.css'

console.log("In Main", { origin });

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <div>
      <App />
    </div>
  </React.StrictMode>,
)
