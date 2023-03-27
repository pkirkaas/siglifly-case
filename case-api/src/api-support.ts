/**
 * Supporting API requests
 */
import { add } from 'date-fns';
import {getModelIds,getById, GenObj, prismax, PkError, prisma, refNames,  refDefs, randInt,} from './init.js';

export const customerIncludes = {
	all: {
			projects: {
				include: {
					requirements: {
						include: {
							signiflyer: true,
						}
					}
				}
		}
	}
}

/**
 * params can be a string for a predefined set of params, or a custom object
 */
export async function getCustomerData(params:any=null) {
	let query:GenObj = {};
	if (typeof params === 'string' && (params in customerIncludes)) {
		query.include = customerIncludes[params];
	} 
	//@ts-ignore
	return await prismax.customer.findMany( query);
}

export async function getSigniflyers(params: any = null) {
	return await prismax.signiflyer.findMany( );
}

export async function getFilledReqs() {
	let filledReqs = prismax.requirement.findMany({
		where: {
			//@ts-ignore
			NOT: { signiflyerId: null }
		},
		include: { signiflyer: true },
});
	return filledReqs;
}

export async function getReq(id) {
	let req = await getById('requirement', id);
	return req;
}

/*
export async function findMatches(reqId) {
}
*/
