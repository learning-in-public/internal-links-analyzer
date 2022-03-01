export type AnalyzedLink = Omit<PathlessAnalyzedLink, 'href'> & {
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
  url: string;
};

export type File = {
  name: string;
  absPath: string;
};
