import { useState, useEffect } from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import './App.scss'
import {  getCustomerData, Client, } from './init.js';
import { Front } from './pages/Front';
import { Customer } from './pages/Customer';
import "./scss/site.scss";
 function App(props) {
  let Comp = Front;
  if (props.Comp) {
    Comp = props.Comp;
  }
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <h1>Vite + React</h1>
      <Comp />
    </div>
  )
}

export default App
