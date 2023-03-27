import {
	typeOf, getById, getCustomerData, allProps, allPropsWithTypes, addRelated, findMatches, runCli,
	prisma, getModelIds,getFilledReqs, GenObj, strIncludesAny, getRandEls, getTableMap, getPrismax, prismax
} from '../init.js';

import { isObject } from 'pk-ts-common-lib';

let tests = {

	filled: async function () {
		let filled = await getFilledReqs();
		let cnt = filled.length;
		console.log({ filled, cnt });
	},
	tstFM: async function () {
		let reqIds = await getModelIds('requirement');
		let reqId = getRandEls(reqIds);
		let req = await getById('requirement', reqId);
		let matches = await req.findMatches();
		console.log({ matches });
	},
	getCustomer: async function () {
		let cIds = await getModelIds('customer');
		let cId = getRandEls(cIds);
		let cust = await getById('customer', cId);
		//let custWProjects = await getById('customer', cId, 'projects');
		let projIncludes = {
			projects: {
				include: { requirements: true }
			}
		};
		//let custWProjects = await getById('customer', cId, 'projects');
		let custWProjects = await getById('customer', cId, projIncludes);
		console.log({ cust, custWProjects });
	},
	getCustomers: async function () {
		let cd = await getCustomerData('all');
		console.log({ cd });
	},
	addSygToReq: async function () {
		let reqIds = await getModelIds('requirement');
		let sigIds = await getModelIds('signiflyer');
		let reqId = getRandEls(reqIds);
		let sigId = getRandEls(sigIds);
		console.log('addSygToReq', { reqId, sigId });
		let req = await prismax.requirement.findUnique({
			where: { id: reqId }
		});
		let sig = await prismax.signiflyer.findUnique({
			where: { id: sigId }
		});
		let res = await addRelated(req, sig);
		let newreq = await prismax.requirement.findUnique({
			where: { id: reqId },
			include: { signiflyer: true }
		});
		//console.log({ req, sig, res });
		console.log({ newreq });

	},
	getPrismaProps: async function () {
		//@ts-ignore
		let props = allPropsWithTypes(prisma);
		let propx = allPropsWithTypes(prismax);
		console.log(props, propx);
	},
	getProps: async function () {
		//@ts-ignore
		let props = allPropsWithTypes(prismax.Project);
		console.log(props);
		//@ts-ignore
		//@ts-ignore
		let name = await prismax.Project.name;
		let ntl = name.toLowerCase();
		console.log(name, ntl);
	},
	projectDates: async function () {
		//let info = await prisma[modelName].findMany({ select: { id: true } });
		let dates = await prismax.project.findMany({ select: { from: true, } });
		let sigdates = await prismax.signiflyer.findMany({ select: { availableFrom: true, } });
		console.log("Project Dates:", { dates, sigdates });

	},
	tstExt: async function () {
		//@ts-ignore
		let req = await prismax.requirement.findFirst({});
		let io = isObject(req);
		console.log({ req, io });
	},

	tstFindSigs: async function () {
		let req = await prismax.requirement.findFirst({});
		let matches = await findMatches(req);
		console.log({ req, matches });
	},

	tstSub: async function () {
		let proj = await prismax.project.findFirst({
			include: {
				requirements: true,
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
