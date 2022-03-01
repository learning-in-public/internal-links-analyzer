import { getInternalLinks } from './lib';

getInternalLinks(`${__dirname}../nodes`)
  .then(() => {
    console.log('done');
    process.exit(0);
  })
  .catch((err) => {
    console.warn(err);
    process.exit(1);
  });
