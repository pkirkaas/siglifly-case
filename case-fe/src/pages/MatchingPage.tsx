import { useState, useEffect, Fragment } from "react";
//import {usePopup, DialogType} from "react-custom-popup";
import { getMatches, GenObj, getCnt, isObject, typeOf, JSON5Stringify, isEmpty,  } from "./init.js";
import { Signiflyer, RenderArr, Requirement, } from '../components/components'
const urlParams = new URLSearchParams(window.location.search);
const reqId = urlParams.get('reqId');
console.log({ urlParams, reqId });
export function MatchingPage() {
	return (
		<div>
		<div className='PageTitle'>Sigiflyers Matching The Requirement</div>
    <FindMatches />
		</div>
	);
}

export function FindMatches(props) {
  let id = props.id;
  let [ares, setAres] = useState({});
	let [inited, setInited] = useState(0);
	let res: GenObj = {};
	useEffect(() => {
    async function initApi() {
      //res = await getMatches(id);
      res = await getMatches(reqId);
      setAres(res);
      console.log('In FindMatches: ', { res, ares });
      if (!inited) {
        setInited(1);
      }
    }
    initApi();
  }, [inited]);
  //return Matches(res);
  return (<Matches matches={ares} />)
}

export function Matches(props) {
  let res = props.matches;

  let keys = Object.keys(props);
  let resKeys = Object.keys(res);
  let signiflyers = res.matches;
  let requirement = res.requirement;
  if (!signiflyers) {
    return (<h1>...Waiting</h1>)
  }

	return (
    <div>
      <h1 className='RenderArrLabel'>Requirement:</h1>
      <Requirement {...requirement} />
      <div>
        <RenderArr arr={signiflyers} label="Sygnifliers Meeting or Exceeding Requirements" Comp={Signiflyer} />
      </div>
    </div>
  );
  return (<h1>Getting the matches</h1>)
}