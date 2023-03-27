/**
 * Functions to support prisma data for assignment task
 */
import { isObject, dtFmt, isPrimitive, GenObj, PkError, prisma, isSubset, strIncludesAny, isEmpty,  } from './init.js';

import { PrismaClient, } from '@prisma/client'

//export const prismax = await prisma.$extends({
export async function getPrismax() {
	let aprisma = await new PrismaClient();
	let prismax = await aprisma.$extends({
		result: {
			requirement: {
				model: {
					needs: {},
					compute() {
						//@ts-ignore
						return prismax.requirement.name.toLowerCase();
					},
				},
				filled: {
					needs: {},
					compute(requirement) {
						//@ts-ignore
						return !!requirement.signiflyerId;
					}
				},
				education: {
					needs: {},
					compute(requirement) {
						//@ts-ignore
						return educationFromId(requirement.education_key);
					},
				},
				findMatches: {
					needs: {},
					compute(requirement) {
						//@ts-ignore
						return () => findMatches(requirement.id);
					},
				}

			},
			project: {
				model: {
					needs: {},
					compute() {
						//@ts-ignore
						return prisma.project.name.toLowerCase();
					},
				},
				fromPretty: {
					needs: {},
					compute(project) {
						//@ts-ignore
						return dtFmt('short', project.from);
					}
				},
				/*
				education: {
					needs: {},
					compute(requirement) {
						//@ts-ignore
						return educationFromId(requirement.education_key);
					},
				}
					*/
			},

			signiflyer: {
				model: {
					needs: {},
					compute() {
						//@ts-ignore
						return prisma.signiflyer.name.toLowerCase();
					},
				},
				education: {
					needs: {},
					compute(signiflyer) {
						//@ts-ignore
						return educationFromId(signiflyer.education_key);
					},
				},
				availableFromPretty: {
					needs: {},
					compute(signiflyer) {
						//@ts-ignore
						return dtFmt('short', signiflyer.availableFrom);
					}
				},

			},
		}
	});
	return prismax;
}

export const prismax = await getPrismax();

export function educationFromId(id) {
	return refDefs.Education[id];
}
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
export async function clearTables(tables?: any) {
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

export async function addRelated(from: GenObj, to: GenObj) {
	let fromName = from.model;
	let toName = to.model;
	let toNameId = toName + 'Id';
	let updateQuery =
	{
		where: { id: from.id },
		data: {
			[toNameId]: to.id ,
			}
	};

	let updateQuery2 =
	{
		where: { id: from.id },
		data: {
			[toName]: {
				connect: [{ id: to.id }],
			}
		}
	};
	console.log(`Executing update query on [${fromName}]:`, { updateQuery });
	//@ts-ignore
	let res = await prismax[fromName].update(updateQuery);
	return res;
}

export const refDefs = {
	Tool: ['MSOffice', 'JavaScript', 'PHP',],
	Education: ['none', 'selftaught', 'BS', 'MS', 'PhD',],
	Expertise: ['Manager', 'BackendDeveloper', 'FrontendDeveloper', 'DevOps', 'UXDesigner', 'Architect', 'Sales',],
};
export const refNames = Object.keys(refDefs);
export const educationKeys = Object.keys(refDefs.Education).map((el) => parseInt(el));
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

/**
 * Get a model instance by id.
 * @param include - optional - string, array or object for complex includes
 */
export async function getById(model, id, include: any = null) {
	let query: GenObj = { where: { id } };
	let origInclude = include;
	console.log("Entery getById - include:", { include });
	if (include) {
		id = parseInt(id);
		if (typeof include === 'string') {
			include = [include];
		}
		if (Array.isArray(include)) {
			let includeArr = include;
			include = {};
			for (let key of includeArr) {
				include[key] = true;
			}
		}
		if (!isObject(include)) {
			throw new PkError(`in getById - invalid arg for 'include':`, { origInclude, include });
		}
		if (!('include' in include)) {
			include = { include };
		}
		query.include = include.include;
	}
	console.log('Debugging getById include:', { include, query });

	//@ts-ignore
	return await prismax[model].findUnique(query);
	/*
	return await prismax[model].findUnique({
		where: { id },
		include
	});
	*/
}

/**
 * For a requirement, return a list of potential signiflyier resources
 * @param int | requirement instance: req
	yrs_exp_gen  Int
	yrs_exp_sig  Int
 */
export async function findMatches(req) {
	if (isPrimitive(req)) {
		req = await getById('requirement', req);
	}
	// Find project start date from req
	let project = await getById('project', req.projectId);
	/*
	let project = await prismax.project.findUnique({
		where: {
			id: req.projectId,
		}
	});
	*/
	let from = project.from;
	let { education_key, tool, expertise, yrs_exp_gen, yrs_exp_sig, } = req;
	let signiflyers = await prismax.signiflyer.findMany({
		where: {
			education_key: {
				gte: education_key,
			},
			tool,
			expertise,
			yrs_exp_gen: {
				gte: yrs_exp_gen,
			},
			yrs_exp_sig: {
				gte: yrs_exp_sig,
			},
			/*
			availableFrom: {
				lte: from,
			},
			*/
			//	available: true,
		}
	});
	return signiflyers;
}
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