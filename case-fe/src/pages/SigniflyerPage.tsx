import { useState, useEffect } from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import '../App.scss'
import  axios  from 'axios';
import {  getCustomerData, getSignifliers,  GenObj,  } from './init.js';
import {   Client,TstComp, Signiflyer, TstJson, RenderArr} from '../components/components.js';
export function SigniflyerPage() {
  let [ares, setAres] = useState({});
	let [inited, setInited] = useState(0);
	let res: GenObj = {};
	useEffect(() => {
    async function initApi() {
      res = await getSignifliers();
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
<div>
      <RenderArr arr={ares} label="Sygnifliers" Comp={Signiflyer} />
      </div>

    </div>
	)
}
