import { useState, useEffect } from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import './App.scss'
import {  getCustomerData, page, getPage } from './init.js';
import {   Client, } from './components/components.jsx';
import { HomePage } from './pages/HomePage';
import { SigniflyerPage } from './pages/SigniflyerPage';
import { MatchingPage } from './pages/MatchingPage';
import { RequirementPage } from './pages/RequirementPage';
import { Menu } from './Menu';
import { CustomerPage } from './pages/CustomerPage';
import "./scss/site.scss";

export const pagesToComp = {
  //'/requrement': RequirementPage,
  '/home': HomePage,

  '/signiflyers': SigniflyerPage,
//  '/customer' : Client,
 '/matching': MatchingPage,
};

 function App(props) {
  const [count, setCount] = useState(0)
  let Comp = pagesToComp[window.location.pathname] ?? HomePage;

  return (
    <div className="App">
      <Menu />
      <div className="PageWrapper">
      <Comp />
      </div>
    </div>
  )
}

export default App
