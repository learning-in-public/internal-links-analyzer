import type { Root, LinkReference, Definition, Link, Content } from 'mdast';
import type { Node } from 'unist';
import { remark } from 'remark';
import { visit } from 'unist-util-visit';
import remarkHtml from 'remark-html';

import { Link as AnalyzedLink } from './types.js';

// Internal.
function parseMarkdownChildrenToHtml(children: Content[]): string {
  const root: Root = { type: 'root', children };
  return remark().use(remarkHtml).stringify(root);
}

/**
 * Returns the AST of the given string. Expects Markdown source code.
 */
export function parseMarkdownToAst(doc: string): Root {
  return remark().parse(doc);
}

/**
 * Returns a list of all links on the page.
 */
export function getMarkdownLinks(ast: Node): AnalyzedLink[] {
  const links: AnalyzedLink[] = [];

  const linkReferences = new Map<string, LinkReference>();
  const definitions = new Map<string, Definition>();

  visit(ast as any, 'link', (node: Link) => {
    console.log('-------');
    console.log('has link!!!!');
    console.log(JSON.stringify(parseMarkdownChildrenToHtml(node.children)));
  });

  return links;
}

/**
 * Checks if the given analyzed link is internal.
 */
export function isInternalLink(link: AnalyzedLink): boolean {
  console.log(link);
  return true;
}
