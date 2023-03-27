import { useState, useEffect } from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import '../App.scss'
import  axios  from 'axios';
import {  getCustomerData,  GenObj,  } from './init.js';
import {   Client,TstComp, TstJson, RenderArr} from '../components/components.js';
export function HomePage() {
  let [ares, setAres] = useState({});
	let [inited, setInited] = useState(0);
	let res: GenObj = {};
	useEffect(() => {
    async function initApi() {
      res = await getCustomerData();
      setAres(res);
      //console.log(`useeffect after initApi, res:`, { res });
      //setInited(inited + 1); // Infinite loop
      // Only runs once: setInited(1);
      // Try:
      if (!inited) {
        setInited(1);
      }
    }
    initApi();
  }, [inited]);
  
	return (
    <div >
      <TstComp/>
<div>
      <RenderArr arr={ares} label="More Clients" Comp={Client} />
      </div>

    </div>
	)
}


	/*
<div>
      <TstJson data={ares} label="Clients & Projects" />
      </div>
		<h1>This is the front page!</h1>
    */