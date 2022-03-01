import { resolve } from 'node:path';

import { getInternalLinks } from './lib.js';

getInternalLinks(resolve('./nodes'))
  .then(() => {
    console.log('OK!');
    process.exit(0);
  })
  .catch((err) => {
    console.warn(err);
    process.exit(1);
  });
