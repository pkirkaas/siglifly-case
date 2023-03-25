import {typeOf, runCli, prisma, getModelIds, GenObj, strIncludesAny,  getTableMap, getPrismax, prismax } from '../init.js';

import { isObject } from 'pk-ts-common-lib';

let tests = {
	tstExt: async function () {
		//@ts-ignore
		let req = await prismax.requirement.findFirst({});
		let io = isObject(req);
		console.log({ req, io });
	},

	tstSub: async function () {
		let proj = await prismax.project.findFirst({
			include: {
				requirements:true,
			}
		});
		console.log({ proj });
	},
	getOneCustomer: async function () {
	//@ts-ignore
	let customer = await prisma.customer.findFirst({
		include: {
			projects: {
				include: { requirements: true },
			}
		}

	});
	let toc = typeOf(customer);
	console.log({ customer, toc });
	}
}



/*
async function run(test:string) {
	await tests[test]();
};
*/
await runCli(tests);
process.exit();

/*
async function tstAsync() {
	//let tst = await tableMap;
	let tst = await getTableMap();
	console.log({ tst });
};

await tstAsync();
process.exit();
*/
