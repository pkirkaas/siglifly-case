import { NavLink, BrowserRouter } from "react-router-dom";
import { isObject } from 'pk-ts-common-lib';
import { origin, page } from './lib.js';
//import { HomePage } from './pages/HomePage';
import { BaseComp, KeyFragment } from './components/components';
import { pagesToComp } from './App';
import pagestToComp from './App';



export function MenuButton(props) {
	let { apage, key, params, label } = props;
	label = label ?? apage.substring(1).toUpperCase();
	//let url = `${origin}${apage}`;
	let qs = '';
	if (isObject(params)) {
		qs = '?' + Object.keys(params).map(key => key + '=' + params[key]).join('&');
	}

	let url = `${origin}${apage}${qs}`;
	console.log({ url });
	return (
		<div key={key} className='MenuItem'>
			<div className='MenuLink'>
				<a href={url}>
					<div className="MenuLabel">
						{label}
					</div>
				</a>
			</div>
		</div>
	)
}



export function Menu() {
	let pages = Object.keys(pagesToComp);

	let buttons = pages.map((page, idx) =>
		MenuButton({ apage:page, key: idx }));

	return (
		<div className="MenuWrapper">
			{buttons}
		</div>
	)
};







