import type { Root, LinkReference, Definition, Link, Content } from 'mdast';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import { visit } from 'unist-util-visit';
import { PathlessAnalyzedLink } from './types.js';

/**
 * Internal.
 *
 * Compiles the given children (conceptually rooted under a single node) to HTML.
 */
function compileChildrenToHtml(children: Content[]): string {
  const root: Root = { type: 'root', children };
  return remark().use(remarkHtml).stringify(root).trim();
}

/**
 * Internal.
 *
 * Given a map of link references and a map of definitions, link these over by the link identifier.
 *
 * An error is raised if there are any link references whose identifier does not refer to any
 * existing definition.
 *
 * For more information about "reference links", see:
 * https://spec.commonmark.org/0.30/#full-reference-link
 */
function matchReferenceLinks(
  linkRefs: Map<string, LinkReference>,
  defs: Map<string, Definition>
): PathlessAnalyzedLink[] {
  const pathlessAnalyzedLinks: PathlessAnalyzedLink[] = [];

  for (const [ident, linkRef] of linkRefs) {
    const correspondingDef = defs.get(ident);

    if (!correspondingDef) {
      // Per spec this should never happen as a match must exist to form a valid ref link.
      // https://spec.commonmark.org/0.30/#full-reference-link
      throw new Error('Unreachable.');
    }

    pathlessAnalyzedLinks.push({
      html: compileChildrenToHtml(linkRef.children),
      title: correspondingDef.title,
      url: correspondingDef.url,
    });
  }

  return pathlessAnalyzedLinks;
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

  const refLinks = matchReferenceLinks(linkReferences, definitions);
  pathlessAnalyzedLinks.push(...refLinks);

  return pathlessAnalyzedLinks;
}

/**
 * Checks if the given analyzed link is internal.
 */
export function isInternalLink(link: PathlessAnalyzedLink): boolean {
  console.log(link);
  return true;
}
