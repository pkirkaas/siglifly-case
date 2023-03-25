export * from 'pk-ts-sqlite-lib';
import { getDirname, slashPath } from 'pk-ts-sqlite-lib';
import { PrismaClient, Signiflyer} from '@prisma/client'
//export Signiflyer;
export const prisma = await new PrismaClient();
export const projectDir = getDirname(import.meta.url, '..');

export const cwd = process.cwd();
import path from 'path';
import * as dotenv from "dotenv";
//@ts-ignore
dotenv.config(path.join(cwd, ".env"));
export * from './prisma-lib.js';
//export * from './seed.js';
export * from './fakes.js';
export * from './api-support.js';
/** Names of the reference tables*/