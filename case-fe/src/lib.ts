import  axios  from 'axios';
import { GenObj,  } from './init.js';
export const origin = window.location.origin;
export const apiUrl = `${origin}/api`;
export function mkUrl(rel) {
	return `${apiUrl}/${rel}`;
}

export let compCount = { cnt: 0};
export function getCnt() {
	compCount.cnt++;
	//console.log(`NewCnt: [${compCount.cnt}]`);
	return compCount.cnt;
}

axios.defaults.baseURL = apiUrl;



export function getPage() {
	let path = window.location.pathname;
	return path;
}

export const page = getPage();

export async function getCustomerData(params: GenObj = {}) {
	try {

		let res = await axios.get(apiUrl);
		let data = res.data;
		//console.log('in async get api, customer:', { data });
		return data;
	} catch (e) {
		return e;
	}
}
export async function getSignifliers(params: GenObj = {}) {
	try {
		let res = await axios.get(`${apiUrl}/signiflyers`);
		let data = res.data;
		//console.log('in async get api, customer:', { data });
		return data;
	} catch (e) {
		return e;
	}
}

export async function getMatches(reqId) {
	try {
		let res = await axios.get(`${apiUrl}/findmatches/${reqId}?reqId=${reqId}`);
		let data = res.data;
		console.log("In get matches API:", { data });
		//console.log('in async get api, customer:', { data });
		return data;
	} catch (e) {
		return e;
	}
}


//console.log({ origin });