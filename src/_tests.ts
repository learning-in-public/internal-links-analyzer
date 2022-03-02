import { resolve } from 'node:path';
import { getInternalLinks } from './lib.js';

const links = getInternalLinks(resolve('./nodes'));
console.log(links);
