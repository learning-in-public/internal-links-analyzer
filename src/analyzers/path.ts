import { dirname, join } from 'node:path';
import { AnalyzedLink, PathlessAnalyzedLink } from '../types';

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
export function AnalyzeLinkPath(parentFileAbsPath: string) {
  return function analyzeLinkPath(link: PathlessAnalyzedLink): AnalyzedLink {
    const { html, title, rawUrl } = link;
    const parentDirAbsPath = dirname(parentFileAbsPath);
    const linkAbsPath = join(parentDirAbsPath, rawUrl);

    return {
      html,
      title,
      rawUrl,
      parentFileAbsPath,
      linkAbsPath,
    };
  };
}
