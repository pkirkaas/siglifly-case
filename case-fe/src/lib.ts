import  axios  from 'axios';
import { GenObj,  } from './init.js';
export const origin = window.location.origin;
export const apiUrl = `${origin}/api`;
export function mkUrl(rel) {
	return `${apiUrl}/${rel}`;
}

axios.defaults.baseURL = apiUrl;

export async function getCustomerData(params: GenObj = {}) {
	try {

		let res = await axios.get(apiUrl);
		let data = res.data;
		console.log('in async get api, customer:', { data });
		return data;
	} catch (e) {
		return e;
	}
}

console.log({ origin });