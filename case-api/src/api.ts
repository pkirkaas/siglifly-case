//require('./init');
import  express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { getCustomerData } from  './init.js';
import './init.js';
const dev = process.env.NODE_ENV !== 'production';
let PORT = process.env.PORT || '3071';
let hostname = 'localhost';
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', async (req, res) => {
	res.send({ api: '/' });


});
app.get('/api', async (req, res) => {
	res.send({ api: '/api' });
});
app.get('/api/customers', async (req, res) => {
	let data = await getCustomerData();
	res.send(data);
});

app.post('/api/customers', async (req, res) => {
	let data = await getCustomerData();
	let json = req.body;
	console.log({ json });
	res.send(data);
});

app.get('*', async (req, res) => {
	res.send({ default: "catcher" });
});

app.listen(PORT, () => console.log(`App listening on port: ${PORT}`));
