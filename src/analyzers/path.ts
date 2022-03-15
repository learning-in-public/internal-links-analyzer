import { dirname, join } from 'node:path';
import { AnalyzedLink, Frontmatter, PathlessAnalyzedLink } from '../types';

/**
 * Checks whether the given link is local.
 */
export function isLocalLink(link: PathlessAnalyzedLink): boolean {
  return link.rawUrl.startsWith('./');
}

/**
 * Contextualizes a `PathlessAnalyzedLink` into an `AnalyzedLink`.
 *
 * Assumes the given pathlessAnalyzedLink is local.
 */
export function AnalyzeLinkPath(
  parentFilePath: string,
  frontmatters: Map<string, Frontmatter | undefined>
) {
  return function analyzeLinkPath(link: PathlessAnalyzedLink): AnalyzedLink {
    const { html, title, rawUrl } = link;
    const parentDirPath = dirname(parentFilePath);
    const toPath = join(parentDirPath, rawUrl);

    return {
      html,
      title: (frontmatters.get(toPath)?.title as string) || title,
      rawUrl,
      fromPath: parentFilePath,
      toPath,
    };
  };
}
