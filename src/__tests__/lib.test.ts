import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getInternalLinks } from '../lib';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const fixturesPath = path.join(dirname, '../__fixtures__');

it('gets the internal links', async () => {
  const links = await getInternalLinks(fixturesPath);

  expect(links).toEqual([
    {
      html: 'see baz',
      title: null,
      rawUrl: './baz.md',
      fromPath: path.join(fixturesPath, 'foo.md'),
      toPath: path.join(fixturesPath, 'baz.md'),
    },
    {
      html: 'see bar',
      title: null,
      rawUrl: './bar.md',
      fromPath: path.join(fixturesPath, 'foo.md'),
      toPath: path.join(fixturesPath, 'bar.md'),
    },
  ]);
});
