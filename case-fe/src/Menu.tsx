import { NavLink, BrowserRouter } from "react-router-dom";
import { origin, page } from './lib.js';
//import { HomePage } from './pages/HomePage';
import { BaseComp, KeyFragment } from './components/components';
import { pagesToComp } from './App';
import pagestToComp from './App';


/**
 * Returns a URL & a label from a path
 */
export function mkBtnData(apage) {
	let label = apage.substring(1).toUpperCase();
	let url = `${origin}${apage}`;
	return { label, url };
}

export function MenuButton(apage, key) {
	let label = apage.substring(1).toUpperCase();
	let url = `${origin}${apage}`;
	return (
		<div className='MenuItem'>
			<div className='MenuLink'>
				<a href={url}>
					<div className="MenuLabel">
						{label}
						</div>
				</a>
				</div>
		</div>
	)
	/*
	return (<NavLink
		key={key}
		to={apage}
		className={({ isActive, isPending }) =>
			isPending ? "pending" : isActive ? "active" : ""
		}
	>
		{label}

	</NavLink>);
	*/
};




export function Menu() {
	let pages = Object.keys(pagesToComp);

	let buttons = pages.map((page, idx) =>
		MenuButton(page, idx));

	return (
		<div className="MenuWrapper">
			{buttons}
		</div>
	)
	/*
	return (
		<BrowserRouter>
		<div className="menuholder">
			{buttons}
		</div>
		</BrowserRouter>
	)
	*/
};







