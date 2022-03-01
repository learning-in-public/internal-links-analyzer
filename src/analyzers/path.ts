import { dirname, join } from 'node:path';
import { AnalyzedLink, PathlessAnalyzedLink } from '../types.js';

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
export function AnalyzeLinkPath(parentFilePath: string) {
  return function analyzeLinkPath(link: PathlessAnalyzedLink): AnalyzedLink {
    const { html, title, rawUrl } = link;
    const parentDirPath = dirname(parentFilePath);
    const toPath = join(parentDirPath, rawUrl);

    return {
      html,
      title,
      rawUrl,
      fromPath: parentFilePath,
      toPath,
    };
  };
}
