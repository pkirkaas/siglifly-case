//require('./init');
import  express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { getCustomerData, dtFmt } from  './init.js';
import './init.js';
const dev = process.env.NODE_ENV !== 'production';
let PORT = process.env.PORT || '3071';
//let hostname = 'localhost';
let acnt = 0;
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
	let cd = await getCustomerData();
	//res.send({ api: '/' });
	alog("GET endpoint: /");
	res.send(cd);


});
app.get('/api', async (req, res) => {
	let data = await getCustomerData();
	alog("GET endpoint: /api", { data });
	res.send(data);
});
app.get('/api/customers', async (req, res) => {
	let data = await getCustomerData();
	alog('GET /api/customers',{ data });
	res.send(data);
});

app.post('/api/customers', async (req, res) => {
	let data = await getCustomerData();
	let json = req.body;
	alog('POST /api/customers',{ json, data });
	res.send(data);
});

app.get('*', async (req, res) => {
	alog('Default catcher');
	res.send({ default: "catcher" });
});

app.listen(PORT, () => console.log(`App listening on port: ${PORT}`));
