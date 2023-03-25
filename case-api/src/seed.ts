//import { PrismaClient } from '@prisma/client';
import {
	refDefs, fSygData, prisma, fCustomerData, fProjectData,
	GenObj, getTableMap, clearTables,fReqdata,
} from './init.js';
import { Signiflyer,  } from '@prisma/client';



export async function mkFakeSygs(cnt = 15) {
	//await prisma.signiflyer.deleteMany();
	let recs = [];
	let dataArr = await fSygData(cnt);
	for (let data of dataArr) {
		//@ts-ignore
		recs.push(await prisma.signiflyer.create({ data }));
	}
	return recs;
}

export async function mkFakeCustomers(cnt = 3) {
	//@ts-ignore
	//await prisma.customer.deleteMany();
	let recs = [];
	let dataArr = await fCustomerData(cnt);
	for (let data of dataArr) {
		//@ts-ignore
		recs.push(await prisma.customer.create({ data }));
	}
	return recs;
}


/**
 * fkCustomers have to exist first
 */
export async function mkFakeProjects(cnt = 10) {
	let recs = [];
	let dataArr = await fProjectData(cnt);
	for (let data of dataArr) {
		//@ts-ignore
		recs.push(await prisma.project.create({ data }));
	}
}

export async function mkFakeReqs(cnt = 10) {
	let recs = [];
	let dataArr = await fReqdata(cnt);
	for (let data of dataArr) {
		//@ts-ignore
		recs.push(await prisma.requirement.create({ data }));
	}
}
async function main() {
	//await clearTables();
	let users = await mkFakeSygs(22);
	let clients = await mkFakeCustomers();
	let projects = await mkFakeProjects();
	let reqs = await mkFakeReqs();
}


// Top-level async/await to seed
try {
	await main();
	console.log('Finished Seeding');
} catch (e) {
	console.error(`Prisma Seed Error:`, { e });
}
await prisma.$disconnect();
process.exit();