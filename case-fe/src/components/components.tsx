import { useState, useEffect, Fragment } from 'react'
import { GenObj, getCnt, isObject,typeOf,  JSON5Stringify, isEmpty} from './init.js'
import { dtFmt } from 'pk-ts-common-lib'

export function KeyFragment(...all) {
  let props = all[0];
  //props.key = 
  /*
  if (!props.key) {
    props.key = getCnt();
  }
  */
  //return Fragment(props); 
  console.log("In KeyFragement - props:", { props, all });
  return (<Fragment {...props} />);
}

export function BaseComp(props:GenObj = {}) {
  let tstKey = props.key;
  let nextKey = getCnt();
  console.log('In BaseComp', { tstKey, nextKey });
  if (!('key' in props)) {
    props.key = getCnt();
  }
  let key = props.key;
  let children = props.children;
  return KeyFragment({ key, children });
}



export function Requirement(props) {
  let { tool, education, yrs_exp_gen, yrs_exp_sig, signiflyer, about, filled } = props; 




}

/*
export function Clients(props) {
  return (RenderArr({Comp:Client, 
  )

}
*/

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
        <RenderArr Comp={Project} arr={projects} label="Projects" />
      </div>
    )
  }
  return out;
}

export function Project(props) {
  let from = props.from;
  let fmtFrom = dtFmt('short', from); 
  let name = props.name;
  let requirements = props.requirements;
  return (
    <KeyFragment>
      <div>
      <div className='ProjectLabelWrapper'>
        <div className='ProjectName'>{name}</div>
        <div className='ProjectDateWrapper'>{fmtFrom}</div>
        </div>
        {RenderArr({ arr: requirements,Comp:TstJson })}

      </div>

    </KeyFragment>

  )
    
}

export function RenderArr(props) {
  let label = props.label;
  let Comp = props.Comp;
  let arr:any[] = props.arr;
  let labelClass = props.labelClass ?? 'clabel';
  let wrapClass = props.wrapClass ?? 'bpm';
  let arrClass = props.arrClass ?? 'bpm2'
  let compClass = props.compClass ?? 'crow';
  let toComp = typeOf(Comp);
  //console.log("In RA, TOC:", toComp);
  if (!arr || !Array.isArray(arr) || !arr.length ) {
    console.log("Not an array? Arr:", { arr });
    return (<Fragment />);
  }
  let arrOut = (<Fragment />);
  //console.log("In RenderArr", { arr });
  try {
    if (Array.isArray(arr)) {
      let myArr: any[] = arr;

      //@ts-ignore
      arrOut = myArr.map((el, idx) => {
        //console.log('In RenderArrMap:', { el });
        return (<div key={idx}>{Comp({ key: idx, ...el, className: compClass })}</div>)
        //return (<BaseComp>{Comp({ key: idx, ...el, className: compClass })}</BaseComp>)
        //BaseComp(Comp({ ...el, className: compClass }));
       // return BaseComp(Comp({ ...el, className: compClass }));
      });
    }
  } catch (e) {
    let stack = e.stack;
    let stackArr = stack.split('\n');
    let msg = e.message;
    console.error("Caught the error here:", { msg, stackArr });
  }
  return (
    <div className={wrapClass}>
      <div className={labelClass}>{label}</div>
      <div className={arrClass}>{arrOut}</div>
    </div>
  );
}

//export const TstComp = (props) => {
export function TstComp (props)  {
  //@ts-ignore;
  let tot = typeOf(this);
  //console.log({ tot });
  return (<div className='inline'>"This is tstComp"</div>)
}
  /*
  let cnt = 7;
  if (!(this.cnt) {
  //@ts-ignore;
    this.cnt = 1;
  }
  //@ts-ignore;
  this.cnt++;
  //@ts-ignore;
  let cnt = this.cnt;

  console.log("This is tstComp w. props:", { props,cnt });
  return (<div className='inline'>"This is tstComp"</div>)
}



           //(<Comp key={idx} {...el} className={compClass} />)
           */


export function TstJson(props) {
	let data = props.data;
  if (!data) {
    data = props;
  }
  let label = props.label;
  let out = "...Waiting";
  if (isObject(data)) {
    out = JSON5Stringify(data);
  } else {
    let tod = typeOf(data);
    //console.log("TstJson - data not an object?", { data, tod, props });
    return BaseComp();
  }
  return (
    <div className='databox'>
      {label ? (<div className='dlabel'>{label}</div>) : BaseComp()}
      <div className='prewrap'>
        {out}
      </div>
    </div>
  );
}

function noFunc() { // To use somewhere
  let [ares, setAres] = useState({});
	let [inited, setInited] = useState(0);
	let res: GenObj = {};
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