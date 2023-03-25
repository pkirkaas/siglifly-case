export * from 'pk-ts-common-lib'
export * from './lib.js'
export * from './components/init.js';
export * from './components/components.jsx';
export * from './pages/init.js';

import { getCustomerData} from './lib.js';
let res = await getCustomerData();
console.log('in init', { res });