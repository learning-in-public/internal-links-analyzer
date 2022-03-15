export type AnalyzedLink = PathlessAnalyzedLink & {
  /** The path of the file that contains the link */
  fromPath: string;

  /** Other file path */
  toPath: string;
};

export type PathlessAnalyzedLink = {
  /** HTML contents */
  html: string;

  /** HTML `title` attribute */
  title: string | null | undefined;

  /** Unlinked URL (as typed in the source markdown) */
  rawUrl: string;
};

// TODO: improve Frontmatter type
export type Frontmatter = Record<string, unknown>;
