/**
 * Functions to support prisma data for assignment task
 */
import { GenObj, PkError, prisma, isSubset, strIncludesAny, isEmpty } from './init.js';

import { PrismaClient, Signiflyer} from '@prisma/client'

//export const prismax = await prisma.$extends({
export async function getPrismax() {
	let aprisma = await new PrismaClient();
	let prismax = await aprisma.$extends({
		result: {
			requirement: {
				filled: {
					needs: {},
					compute(requirement) {
						//@ts-ignore
						return !!requirement.signiflyierId;
					}
				}

			},
			project: {
				filledreqs: {
					//@ts-ignore
					needs: { requirements: true },
					compute(requirements) {
					}
				}
			}

		},
	});
	return prismax;
}

export const prismax = await getPrismax();


//export prismax;

export async function getModelIds(modelName) {
	//@ts-ignore
	let info = await prisma[modelName].findMany({ select: { id: true } });
	let ids = info.map((el) => el.id);
	//let info = await prisma.customer.findMany();
	return ids;
}

/**
 * Empty tables
 * @param string|array|null tables:
 *   table name, array of table names, or empty for all
 */
export async function clearTables(tables?:any) {
	if (tables && !Array.isArray(tables)) {
		tables = [tables];
	}
	let tableMap = await getTableMap();
	let tableNames = Object.keys(tableMap);
	if (!tables) {
		tables = tableNames;
	}
	if (!isSubset(tableNames, tables)) { //Bad table name in tables
		throw new PkError(`Invalid table name for clearTables:`, { tables, tableNames });
	}
	console.log({ tables });
	for (let table of tables) {
		console.log(`Trying to delete [${table}]`);
		//@ts-ignore
		await prisma[table].deleteMany();
	}
}

export const refDefs = {
	Tool: ['MSOffice', 'JavaScript', 'PHP',],
	Education: ['selftaught', 'BS', 'MS', 'PhD',],
	Expertise: ['Manager', 'BackendDeveloper', 'FrontendDeveloper', 'DevOps', 'UXDesigner', 'Architect', 'Sales',],
};
export const refNames = Object.keys(refDefs);
export let tableMap: GenObj = {};



/**
 * Gets table/field defs from the DB - for mapping JSON data to strings
 */
export async function getTableMap() {
	if (isEmpty(tableMap)) {
		let systbles = ['sqlite_sequence', '_prisma_migrations',];
		let nonFields = ['CONSTRAINT', 'CREATE'];
		let schme: GenObj[] = await prisma.$queryRawUnsafe('SELECT * FROM sqlite_schema');
		let tables: GenObj = {};
		for (let ent of schme) {
			if ((ent.type !== 'table') || systbles.includes(ent.name)) {
				continue;
			}
			let sql = ent.sql;
			let sqlArr = sql.split('\n');
			let fieldMap: GenObj = {};
			for (let fieldDef of sqlArr) {
				if (strIncludesAny(fieldDef, nonFields) || (fieldDef === ')')) {
					continue;
				}
				let fieldDefArr = fieldDef.trim().split(' ');
				let name = fieldDefArr[0].replaceAll('"', '');
				let baseName = name;
				let type = fieldDefArr[1];
				if (name.includes('JSON')) {
					type = 'JSON';
					baseName = name.replace('JSON', '');
				}
				fieldMap[name] = { name, type, baseName };
			}
			tables[ent.name] = fieldMap;
		}
		tableMap = tables;
	}
	return tableMap;
};


/*
export async function createRefs(inits = refInits) {
	for (let key in inits) {
		let names = inits[key];
		for (let name of names) {
			try {
				let res = await prisma[key].upsert({
					where: { name },
					update: {},
					create: { name },
				});
				console.log(`Result of creating [${key}:${name}]:`, res);
			} catch (e) {
				console.error(`Error creating [${name}]:`, e);
			}
		}
	}
	return await fetchRefVals();
}
*/

/**
 * Returns
 */
//export async function fetchRefVals(refModel: string): Promise<string[]> {
/*
export async function fetchRefVals(): Promise<GenObj> {
let refVals: GenObj = {};
for (let ref of refNames) {
	let refs = await prisma[ref].findMany();
	refVals[ref] = refs.map((obj) => obj.name);
}
return refVals;
}
*/

//export async function 


/**
 * Initialize Education, Expertise, Tools, etc
 */