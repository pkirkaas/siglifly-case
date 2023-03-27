/**
 * Supporting API requests
 */
import { add } from 'date-fns';
import {getModelIds, GenObj, prismax, PkError, prisma, refNames,  refDefs, randInt,} from './init.js';
//import { Customer } from '@prisma/client';
//import { customer } from '@prisma/client';

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
