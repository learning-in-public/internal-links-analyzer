import type { Root, LinkReference, Definition, Link, Content } from 'mdast';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import { visit } from 'unist-util-visit';
import { PathlessAnalyzedLink } from './types.js';

// Internal.
function compileChildrenToHtml(children: Content[]): string {
  const root: Root = { type: 'root', children };
  return remark().use(remarkHtml).stringify(root).trim();
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
export function getMarkdownLinks(ast: Root): PathlessAnalyzedLink[] {
  const pathlessAnalyzedLinks: PathlessAnalyzedLink[] = [];

  // "normal links"
  visit(ast, 'link', ({ children, title, url }: Link) => {
    pathlessAnalyzedLinks.push({
      html: compileChildrenToHtml(children),
      title,
      url,
    });
  });

  const linkReferences = new Map<string, LinkReference>();
  visit(ast, 'linkReference', (node: LinkReference) => {
    linkReferences.set(node.identifier, node);
  });

  const definitions = new Map<string, Definition>();
  visit(ast, 'definition', (node: Definition) => {
    definitions.set(node.identifier, node);
  });

  console.log({ pathlessAnalyzedLinks, linkReferences, definitions });

  return pathlessAnalyzedLinks;
}

/**
 * Checks if the given analyzed link is internal.
 */
export function isInternalLink(link: PathlessAnalyzedLink): boolean {
  console.log(link);
  return true;
}
