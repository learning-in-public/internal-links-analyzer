export type AnalyzedLink = PathlessAnalyzedLink & {
  /** The path of the file that contains the link */
  parentFileAbsPath: string;

  /** Other file path */
  linkAbsPath: string;
};

export type PathlessAnalyzedLink = {
  /** HTML contents */
  html: string;

  /** HTML `title` attribute */
  title: string | null | undefined;

  /** Unlinked URL (as typed in the source markdown) */
  rawUrl: string;
};

export type File = {
  name: string;
  absPath: string;
};
