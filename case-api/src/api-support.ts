/**
 * Supporting API requests
 */
import { add } from 'date-fns';
import {getModelIds, prismax, PkError, prisma, refNames,  refDefs, randInt,} from './init.js';
//import { Customer } from '@prisma/client';
//import { customer } from '@prisma/client';

export async function getCustomerData() {
	
	//@ts-ignore
	return await prismax.customer.findMany({
		include: { projects: true, }
	});

}
