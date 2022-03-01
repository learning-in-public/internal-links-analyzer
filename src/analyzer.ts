import { remark } from 'remark';
import type * as t from 'mdast';
import { visit } from 'unist-util-visit';

import { Link } from './types.js';

export function parseToAst(doc: string): t.Root {
  return remark().parse(doc);
}

export function getMarkdownLinks(ast: t.Root): Link[] {
  const links: Link[] = [];

  console.log('starting visit...\n\n');

  visit(ast as any, 'link', (node: t.Link) => {
    console.log(node);
  });

  return links;
}

export function isInternalLink(link: Link): boolean {
  console.log(link);
  return true;
}
