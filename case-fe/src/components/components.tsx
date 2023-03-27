import { useState, useEffect, Fragment } from "react";
import {usePopup, DialogType} from "react-custom-popup";
import { getMatches, GenObj, getCnt, isObject, typeOf, JSON5Stringify, isEmpty,  } from "./init.js";
import { MenuButton } from '../Menu'
import { dtFmt } from "pk-ts-common-lib";

export function KeyFragment(...all) {
  let props = all[0];
  //props.key =
  /*
  if (!props.key) {
    props.key = getCnt();
  }
  */
  //return Fragment(props);
  //  console.log("In KeyFragement - props:", { props, all });
  return <Fragment {...props} />;
}

export function BaseComp(props: GenObj = {}) {
  let tstKey = props.key;
  let nextKey = getCnt();
  //console.log('In BaseComp', { tstKey, nextKey });
  if (!("key" in props)) {
    props.key = getCnt();
  }
  let key = props.key;
  let children = props.children;
  return KeyFragment({ key, children });
}

export function DataRow(props) {
  let { label, data, wrapClass, labelClass, dataClass } = props;
  if (!data) {
    return <Fragment />;
  }
  wrapClass = wrapClass ?? "LabelRowWrapper";
  labelClass = labelClass ?? "LabelLabelWrapper";
  dataClass = dataClass ?? "DataItemWrapper";
  return (
    <div key={getCnt()} className={wrapClass}>
      <div className={labelClass}>{label}</div>
      <div className={dataClass}>{data}</div>
    </div>
  );
}
export function mkClasses(key:any=null) {
  let reqRowClass = "ReqRowWrapper";
  let keyedExtraClasses = {
    education: {
      labelClass: "w6",
      dataClass: "w5",
    },
    expertise: {
      labelClass: "w5",
      dataClass: "w10",
    },
    yrs: {
      labelClass: "w5",
      dataClass: "w2",
    },
    tool: {
      labelClass: "w4",
      dataClass: "w8",
    },
    available: {
      labelClass: "w6",
      dataClass: "w8",
    },
    about: {
      labelClass: "w4",
      dataClass: "w8 AboutData",
    },
  }
  let extraClasses = keyedExtraClasses[key] ?? {};
    let rowClasses = {
      wrapClass: `${reqRowClass} ${extraClasses.wrapClass}`,
      labelClass: `ReqLabelWrapper ${extraClasses.labelClass}`,
      dataClass: `ReqDataWrapper ${extraClasses.dataClass}`,
    };
    return rowClasses;
  }


export function Requirement(props) {
  let { tool, education, yrs_exp_gen, yrs_exp_sig, signiflyer, about, filled, expertise,signiflyerId,id   } = props;

  let FILLED = filled ? "FILLED" : "UNFILLED"

  //let reqRowClass = 'ReqRowGrid';

  //let reqRowClass = 'inline';
//  let reqLabelClass = "ReqLabelClass";

  let rowClasses = mkClasses();


  let dataRows = [
    DataRow({ ...mkClasses('education'), label: "Education", data: education }),
    DataRow({ ...mkClasses('expertise'), label: "Expertise", data: expertise }),
    DataRow({ ...mkClasses('yrs'), label: "Yrs Exp", data: yrs_exp_gen }),
    DataRow({ ...mkClasses('yrs'), label: "Yrs Sig", data: yrs_exp_sig }),
    DataRow({ ...mkClasses('tool'), label: "Tool", data: tool }),
//    DataRow({ ...mkClasses('tool'), label: "Filled", data: FILLED }),
    (<Filled {...props} />),
    (<FindMatches reqId={id} />),
    (<Signiflyer {...signiflyer} />)

  ];
  return (<div className="RequirementWrapper"> {dataRows}</div>);
  /*
  return <div className="RequirementWrapper"><div> {dataRows}</div>
    <Signiflyer>{signiflyer}</Signiflyer>
  </div>;
  */
}

export function Icon(props) {
  let { img, width=50, height=100 } = props;
  if (!img) {
    return (<Fragment />);
  }
  return ( <img src={img} className="Icon" />)

}
export function Signiflyer(props)  {
  let { email, name, expertise, tool, yrs_exp_gen, yrs_exp_sig, about, img, education, availableFromPretty , id} = props;
  if (!name) {
    return (<Fragment />);
  }

  let dataRows = [
    DataRow({ ...mkClasses("education"), label: "Name", data: name }),
    DataRow({ ...mkClasses("education"), label: "Education", data: education }),
    DataRow({ ...mkClasses("expertise"), label: "Expertise", data: expertise }),
    DataRow({ ...mkClasses("yrs"), label: "Yrs Exp", data: yrs_exp_gen }),
    DataRow({ ...mkClasses("yrs"), label: "Yrs Sig", data: yrs_exp_sig }),
    DataRow({ ...mkClasses("tool"), label: "Tool", data: tool }),
    DataRow({ ...mkClasses("available"), label: "Available:", data: availableFromPretty }),
    DataRow({ ...mkClasses("about"), label: "About:", data: about }),
    Icon({ img }),
  ];
  return <div className="SigniflyerWrapper"> {dataRows}</div>;

}

function FindMatches(props) {
  let { reqId } = props;

	let matchButton = MenuButton({
    apage: '/matching',
    label: "Find Matches for Req",
    params: { reqId }
  });
  return matchButton;

}
/*
function FindMatches(props) {

  let id = props.id;
  let [ares, setAres] = useState({});
	let [inited, setInited] = useState(0);
	let res: GenObj = {};
	useEffect(() => {
    async function initApi() {
      res = await getMatches(id);
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

  function onClick() {
    alert(`The Req is [${id}]`);
  }
  
	return (
    <div onClick={onClick}>
<div>
        The req id is {id} - Click Me
      </div>

    </div>
	)
}
*/

/**
 */
export function Filled(props) {
  let filled = props.filled;
  let reqId = props.id;
  let filledClass = filled ? 'isFilled' : 'isNotFilled';
  let FILLED = filled ? "FILLED BY" : "UNFILLED"
  return (<div className={filledClass}>{FILLED} {reqId}</div>);
}

export function Client(props) {
  let out = <div className="dlabel">...Waiting'</div>;
  if (props.name) {
    let name = props.name;
    let about = props.about;
    let projects = props.projects;
    out = (
      <div className="crow">
        <div className="cname">{name}</div>
        <div className="cabout">{about}</div>
        <RenderArr Comp={Project} arr={projects} label="Projects" />
      </div>
    );
  }
  return out;
}

export function Project(props) {
  let from = props.from;
  let fmtFrom = dtFmt("short", from);
  let name = props.name;
  let requirements = props.requirements;
  return (
    <KeyFragment>
      <div className="ProjectWrapper">
        <div className="ProjectLabelWrapper">
          <div className="ProjectName">{name}</div>
          <div className="ProjectDateWrapper">{fmtFrom}</div>
        </div>
        {RenderArr({ arr: requirements, Comp: Requirement, label: "Requirements" })}
      </div>
    </KeyFragment>
  );
}

export function RenderArr(props) {
  let label = props.label;
  let Comp = props.Comp;
  let arr: any[] = props.arr;
  let labelClass = props.labelClass ?? "clabel";
  let wrapClass = props.wrapClass ?? "bpm";
  let arrClass = props.arrClass ?? "bpm2";
  let compClass = props.compClass ?? "crow";
  //console.log("In RA, TOC:", toComp);
  if (!arr || !Array.isArray(arr) || !arr.length) {
    return <Fragment />;
  }
  let arrOut = <Fragment />;
  try {
    if (Array.isArray(arr)) {
      let myArr: any[] = arr;
      //@ts-ignore
      arrOut = myArr.map((el, idx) => {
        return <Fragment key={idx}>{Comp({ key: idx, ...el, className: compClass })}</Fragment>;
      });
    }
  } catch (e) {
    let stack = e.stack;
    let stackArr = stack.split("\n");
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
export function TstComp(props) {
  //@ts-ignore;
  let tot = typeOf(this);
  //console.log({ tot });
  return <div className="inline">"This is tstComp"</div>;
}

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
    <div className="databox">
      {label ? <div className="dlabel">{label}</div> : BaseComp()}
      <div className="prewrap">{out}</div>
    </div>
  );
}

