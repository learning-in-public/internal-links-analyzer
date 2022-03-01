# Internal Links Analyzer

This is a proof of concept on how to obtain a list of all "internal links" between Markdown files within some provided directory.

Here, "internal link" is defined as any markdown link with a relative path. All internal links must refer to another file within the given directory. An error should be raised otherwise.

## Tech manifest

The `remark` library is used in order to parse markdown files.

## Notes, questions and other discussions

- The current implementation does not concurrently load files in subdirectories from the root. Only "immediate children" are currently handled. This may be refactored later.
- Should this project also be responsible for the _parsing_ and _compiling_ (to HTML) of the markdown files? Currently it just analyzes each parse tree to locate internal links (i.e. no compilation is performed).