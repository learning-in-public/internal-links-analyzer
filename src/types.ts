export type Link = {
  /** HTML contents */
  html: string;

  /** HTML `title` attribute */
  title?: string;

  /** The path of the file that contains the link */
  parentFileAbsPath: string;

  /** Other file path */
  linkAbsPath: string;
};

export type File = {
  name: string;
  absPath: string;
};
