import { resolve } from 'node:path';
import { getInternalLinks } from './lib.js';

const links = await getInternalLinks(resolve('./nodes'));
console.log(links);
