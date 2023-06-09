//require('./init');
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { getById, getReq, getCustomerData, findMatches, getSigniflyers, dtFmt, dbgWrite, dbgWrt } from './init.js';
import './init.js';
const dev = process.env.NODE_ENV !== 'production';
let PORT = process.env.PORT || '3071';
//let hostname = 'localhost';
let acnt = 0;

export function errLog(...arg) {
	let ts = dtFmt('ts');
	arg.unshift(ts);
	arg.unshift(acnt++);
	dbgWrt(arg, 'errLog', true);
	console.error("Exceptions:", { arg });
}

export function alog(...it) {
	let ts = dtFmt('ts');
	it.unshift(ts);
	it.unshift(acnt++);
	console.log(...it);
}
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', async (req, res) => {
	try {
		let cd = await getCustomerData('all');
		//res.send({ api: '/' });
		alog("GET endpoint: /");
		res.send(cd);
	} catch (e) {
		errLog(e);
		res.send({ e });
	}


});
app.get('/api', async (req, res) => {
	try {
		let data = await getCustomerData('all');
		dbgWrt(data);
		alog("GET endpoint: /api",);
		res.send(data);
	} catch (e) {
		errLog(e);
		res.send(e);
	}
});
app.get('/api/customers', async (req, res) => {
	try {
		let data = await getCustomerData('all');
		alog('GET /api/customers');
		res.send(data);
	} catch (e) {
		errLog(e);
		req.send(e);
	}
});

app.post('/api/customers', async (req, res) => {
	try {
		let data = await getCustomerData('all');
		let json = req.body;
		alog('POST /api/customers',);
		res.send(data);
		
	} catch (e) {
		console.error(e);
		res.send(e);
	}
});

app.get('/api/signiflyers', async (req, res) => {

	try {
		let signiflyers = await getSigniflyers();
		alog('GET /api/signiflyers', { signiflyers });
		res.send(signiflyers);
	} catch (e) {
		res.send(e);
	}
});


app.get('/api/findmatches/:reqId', async (req, res) => {
	let qid = req.query.reqId;
	let id = req.params.reqId;
	id = parseInt(id);
	try {
		if (!id || Number.isNaN(id)) {
			console.error("ID IS NOT VALID");
			res.send({ ID: "Not Valid" });
		}
		console.log('In get req matches - ', { qid, id });
		//let requirement = await getReq(qid);
		let requirement = await getById('requirement', id);
		let matches = await findMatches(qid);
		//let reqCnt = requirement.length;
		let matchesCnt = matches.length;
		alog({ requirement, matchesCnt, qid });
		//alog('GET /api/findmatches',{ id});
		res.send({ matches, requirement });
	} catch (e) {
		console.error("Error in findmatches:", { id, e });
		res.send({ ID: "Not Valid" });
	}
});




app.post('/api/findmatches', async (req, res) => {
	let params = req.body;
	let id = params.reqId;

	try {
		let matches = await findMatches(id);
		alog('POST /api/findmatches', { params });
		res.send(matches);
	} catch (e) {
		console.log({ e })
		res.send({ error: e });
	}
});


app.post('/api/signiflyers', async (req, res) => {
	let params = req.body;
	try {
		let signiflyers = await getSigniflyers(params);
		alog('POST /api/signiflyers', { params, signiflyers });
		res.send(signiflyers);
	} catch (e) {
		console.log({ e })
		res.send({ error: e });
	}
});

app.get('*', async (req, res) => {
	alog('Default catcher');
	res.send({ default: "catcher" });
});

app.listen(PORT, () => console.log(`App listening on port: ${PORT}`));
