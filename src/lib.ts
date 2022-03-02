import * as fs from 'node:fs';
import { extname, join } from 'node:path';
import { parseMarkdownToAst, getMarkdownLinks } from './analyzers/ast.js';
import { AnalyzeLinkPath, isLocalLink } from './analyzers/path.js';
import type { AnalyzedLink } from './types.js';

/**
 * Given a root directory, lists all its Markdown (`.md`) files and returns all the internal links.
 *
 * Internal links are detect by their `href` attribute. External links (such as ones starting with
 * "http://" or "https://" or absolute file paths) are ignored. Relative links are considered to be
 * "internal" and, as such, must refer to another file within the provided root directory.
 */
export function getInternalLinks(rootDirPath: string): AnalyzedLink[] {
  // TODO: Maybe load other directories recursively. For now only the current directory is read.
  const files = fs.readdirSync(rootDirPath, { withFileTypes: true });

  const nodePaths = files
    .filter((dirent) => dirent.isFile() && extname(dirent.name) === '.md')
    .map(({ name }) => join(rootDirPath, name));

  const analyzedLinks: AnalyzedLink[] = [];

  for (const nodePath of nodePaths) {
    const content = fs.readFileSync(nodePath, 'utf-8');

    const ast = parseMarkdownToAst(content);

    const internalLinks = getMarkdownLinks(ast)
      .filter(isLocalLink)
      .map(AnalyzeLinkPath(nodePath));

    analyzedLinks.push(...internalLinks);
  }

  return analyzedLinks;
}
