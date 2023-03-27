//import { PrismaClient } from '@prisma/client';
import {
	dbgWrt, refDefs, fSygData, prisma, fCustomerData, fProjectData,
	GenObj, getTableMap, clearTables,fReqdata, getRandEls,
} from './init.js';



export async function mkFakeSygs(cnt = 100) {
	//await prisma.signiflyer.deleteMany();
	let recs = [];
	let dataArr = await fSygData(cnt);
	for (let data of dataArr) {
		//@ts-ignore
		recs.push(await prisma.signiflyer.create({ data }));
	}
	return recs;
}

export async function mkFakeCustomers(cnt = 4) {
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
export async function mkFakeProjects(cnt = 15) {
	let recs = [];
	let dataArr = await fProjectData(cnt);
	for (let data of dataArr) {
		//@ts-ignore
		recs.push(await prisma.project.create({ data }));
	}
}

export async function mkFakeReqs(cnt = 15) {
	let recs = [];
	let dataArr = await fReqdata(cnt);
	for (let data of dataArr) {
		//@ts-ignore
		recs.push(await prisma.requirement.create({ data }));
	}
	let len = recs.length;
	console.log("NumRecs seeded:", len);
	dbgWrt({ recs, len }, 'recSeed');
}

// Lets add SOME Signiflyers to the reqs:

async function addSomeSygs () {
	let allReqs = await prisma.requirement.findMany({});
}





async function main() {
	//await clearTables();
	let users = await mkFakeSygs(120);
	let clients = await mkFakeCustomers(5);
	let projects = await mkFakeProjects(8);
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