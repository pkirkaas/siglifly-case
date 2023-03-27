/**
 * Generate test data for PoC
 * The reference tables (Education, Expertise, Tool, etc should be 
 * populated first
 */
import { add } from 'date-fns';
import {dbgWrt, getModelIds, getRandEls,  educationKeys, PkError, prisma, refNames,  refDefs, randInt,} from './init.js';

import { faker } from '@faker-js/faker';
export const imgUrls = [
	"https://img.freepik.com/free-photo/pretty-smiling-joyfully-female-with-fair-hair-dressed-casually-looking-with-satisfaction_176420-15187.jpg",
	"https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg",
	"https://img.freepik.com/free-photo/handsome-confident-smiling-man-with-hands-crossed-chest_176420-18743.jpg",
	"https://img.freepik.com/free-photo/indoor-shot-beautiful-happy-african-american-woman-smiling-cheerfully-keeping-her-arms-folded-relaxing-indoors-after-morning-lectures-university_273609-1270.jpg",
	"https://img.freepik.com/free-photo/portrait-dark-skinned-cheerful-woman-with-curly-hair-touches-chin-gently-laughs-happily-enjoys-day-off-feels-happy-enthusiastic-hears-something-positive-wears-casual-blue-turtleneck_273609-43443.jpg",
	"https://img.freepik.com/free-photo/portrait-young-pretty-cheerful-girl-smiling_176420-9553.jpg",
	"https://img.freepik.com/free-photo/portrait-beautiful-mature-blonde-bearded-guy-with-trendy-hairdo-casual-grey-shirt-smiling_176420-15741.jpg",
	"https://img.freepik.com/premium-photo/young-caucasian-woman-isolated-wall-sending-message-with-mobile_1368-90126.jpg",
	"https://img.freepik.com/free-photo/portrait-young-man_23-2148133415.jpg",
	"https://img.freepik.com/premium-photo/portrait-confident-businessman_625516-437.jpg",
];

/** Returns random element (or elements) of array 
 * 
 */


/*
export function getRandEls(arr: any[], cnt = 1) {
	if (!Array.isArray(arr) || !arr.length) {
		throw new PkError(`Invalid array arg to getRandEls:`, { arr });
	}
	cnt = Math.min(cnt, arr.length);
	if (cnt === 1) {
		return arr[Math.floor((Math.random() * arr.length))];
	}
	let ret = [];
	for (let i = 0; i < cnt; i++) {
		let el = 
	}

}
export function getRand(arr: any[] = imgUrls) {
	return arr[Math.floor((Math.random() * arr.length))];
}
*/

export async function fSygData(cnt=1) {
	let fdArr = [];
	for (let i = 0; i < cnt; i++) {
		//console.log(`In mk usr data - refVals?`, { refVals });
		let toolCnt = randInt(4);
		let expCnt = randInt(3);
		let fromTo = getRandDateRange(4);
		let sData = {
			availableFrom: fromTo.from,
			name: faker.name.firstName(),
			email: faker.internet.email(),
			//tools: faker.helpers.arrayElements(refDefs.Tool,toolCnt).join(','),
			//expertises: faker.helpers.arrayElements(refDefs.Expertise,expCnt).join(','),
			tool: faker.helpers.arrayElement(refDefs.Tool),
			expertise: faker.helpers.arrayElement(refDefs.Expertise),
			//educationId: faker.helpers.arrayElement(refDefs.Education.keys()),
			education_key: getRandEls(educationKeys),
			yrs_exp_gen: randInt(2, 10),
			yrs_exp_sig: randInt(1, 3),
			about: faker.lorem.paragraph(),
			img: faker.helpers.arrayElement(imgUrls),
			available: true,
		};
		fdArr.push(sData);
	}
	return fdArr;
}

export async function fProjectData(cnt = 9) {
	let cids = await getModelIds('customer');
	let fpdArr = [];
	for (let i = 0; i < cnt; i++) {
		let fromTo = getRandDateRange(30);

		let data = {
			customerId : faker.helpers.arrayElement(cids),
			from: fromTo.from,
			to: fromTo.to,
			name: faker.company.catchPhrase(),
		}
		fpdArr.push(data);
	}
	return fpdArr;
}

export async function fCustomerData(cnt=1) {
	let cdArr = [];
	for (let i = 0; i < cnt; i++) {
		cdArr.push({
			name: faker.company.name(),
			about: faker.company.bs(),
		});
	}
	return cdArr;
}




export function getRandDateRange(scale = 5) {
	let fromDays = scale * Math.random();
	let toDays = fromDays + 4 * scale * Math.random();
	let now = new Date();
	let from = add(now, { days: fromDays });
	let to = add(now, { days: toDays });
	return { from, to };
}

export async function fReqdata(maxReqs = 15) {
	let dataArr = [];
	let pids = await getModelIds('project');
	//for (let i = 0; i < cnt; i++) {
	for (let projectId of pids) {
		let reqCnt = randInt(3, maxReqs);
		let hasManager = false;
		let expertises = [...refDefs.Expertise];
		for (let i = 0; i < reqCnt; i++) {
			if (hasManager) {
				expertises = expertises.filter((el) => {return el !=='Manager';});
			}
			let expertise = faker.helpers.arrayElement(expertises);
			if (expertise === 'Manager') {
				hasManager = true;
			}
			let data = {
				projectId,
				//education: faker.helpers.arrayElement(refDefs.Education),
			 education_key: getRandEls(educationKeys),
				expertise,
				tool: faker.helpers.arrayElement(refDefs.Tool),
				yrs_exp_gen: randInt(1,4),
				yrs_exp_sig: randInt(1, 2),
				about: faker.hacker.adjective(),
			}
			dataArr.push(data);
		}
	}
	let len = dataArr.length;
	dbgWrt({ dataArr, len }, 'mkReqData');
	return dataArr;
}
