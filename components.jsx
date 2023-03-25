import { useState, useEffect } from 'react'
import { GenObj, isObject,  JSON5Stringify, isEmpty} from './init.js'

export function Requirement(props) {
}

export function Client(props) {
  let out = (<div className='dlabel'>...Waiting'</div>);
  if (props.name) {
    let name = props.name;
    let about = props.about;
    let projects = props.projects;
    out = (
      <div className='crow'>
        <div className="cname">{name}</div>
        <div className="cabout">{about}</div>
        <TstJson data={projects} label="Projects" />
      </div>
    )
  }
  return out;
}

export function RenderArr(props) {
  let label = props.label;
  let Comp = props.Comp;
  let arr = props.arr;
  let lableClass = props.labelClass ?? 'clabel';
  let wrapClass = props.wrapClass ?? 'bpm';
  let arrClass = props.arrClass ?? 'bpm2'
  let compClass = props.compClass ?? 'crow';
  let arrOut = (<div className='crow'>...Waiting</div>);
  if (Array.isArray(arr)) {
    arrOut = (<div>It is an array</div>);
    /*
    let myArr = arr;
    let barrOut = (
      {
        //@ts-ignore
        myArr.map((el, idx) => (
          <Comp key={idx} {...el} className={compClass} />
        )
        )
      }
    )
    */
  }
  return (arrOut);
}




export function TstJson(props) {
	let data = props.data;
  let label = props.label;
  let out = "...Waiting";
	if (isObject(data)) {
    out = JSON5Stringify(data);
	}
  return (
    <div className='databox'>
      <div className='dlabel'>{label}</div>
      <div className='prewrap'>
        {out}
      </div>
    </div>
  );
}

function noFunc() { // To use somewhere
  let [ares, setAres] = useState({});
	let [inited, setInited] = useState(0);
	let res = {};
	useEffect(() => {
    async function initApi() {
  //    res = await getRows(res);
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
}