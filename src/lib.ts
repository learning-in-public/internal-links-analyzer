import * as fs from 'node:fs/promises';
import { extname } from 'node:path';

import {
  parseMarkdownToAst,
  getMarkdownLinks,
  isInternalLink,
} from './analyzer.js';
import { getAllFiles } from './fs-util.js';
import { Link } from './types.js';

export type { Link };

/**
 * Given a root directory, lists all its Markdown (`.md`) files and returns all the internal links.
 *
 * Internal links are detect by their `href` attribute. External links (such as ones starting with
 * "http://" or "https://" or absolute file paths) are ignored. Relative links are considered to be
 * "internal" and, as such, must refer to another file within the provided root directory.
 */
export async function getInternalLinks(rootDirPath: string): Promise<Link[]> {
  console.log(`Will read files from ${rootDirPath}.`);

  const files = await getAllFiles(rootDirPath);
  const nodeFiles = files.filter((file) => extname(file.absPath) === '.md');

  const allInternalLinks: Link[] = [];

  // I won't worry about using Promise.all with some kind of batching here, maybe refactor later.
  for (const nodeFile of nodeFiles) {
    // eslint-disable-next-line no-await-in-loop
    const contents = await fs.readFile(nodeFile.absPath, 'utf-8');

    const ast = parseMarkdownToAst(contents);

    const internalLinks = getMarkdownLinks(ast).filter(isInternalLink);
    allInternalLinks.push(...internalLinks);
  }

  return allInternalLinks;
}
