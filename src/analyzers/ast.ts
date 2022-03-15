import type { Root, LinkReference, Definition, Link, Content } from 'mdast';
import { remark } from 'remark';
import remarkFrontmatter from 'remark-frontmatter';
import remarkHtml from 'remark-html';
import * as yaml from 'js-yaml';
import { visit } from 'unist-util-visit';
import { Frontmatter, PathlessAnalyzedLink } from '../types';

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
      rawUrl: correspondingDef.url,
    });
  }

  return pathlessAnalyzedLinks;
}

/**
 * Returns the AST of the given string. Expects Markdown source code.
 */
export function parseMarkdownToAst(doc: string): Root {
  return remark().use(remarkFrontmatter).parse(doc);
}

/**
 * Returns the frontmatter of the page.
 */
export function getMarkdownFrontmatter(ast: Root): Frontmatter | undefined {
  let frontmatter: Frontmatter | undefined = undefined;

  visit(ast, 'yaml', ({ value }) => {
    // TODO: check if the frontmatter is an object
    frontmatter = yaml.load(value) as Frontmatter;
  });

  return frontmatter;
}

/**
 * Returns a list of all links on the page.
 */
export function getMarkdownLinks(ast: Root): PathlessAnalyzedLink[] {
  const pathlessAnalyzedLinks: PathlessAnalyzedLink[] = [];

  visit(ast, 'link', ({ children, title, url: rawUrl }: Link) => {
    pathlessAnalyzedLinks.push({
      html: compileChildrenToHtml(children),
      title,
      rawUrl,
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
