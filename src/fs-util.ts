import { join } from 'path';
import * as fs from 'fs/promises';

import type { File } from './types';

/**
 * Loads all files within the given directory.
 */
export async function getAllFiles(dirPath: string): Promise<File[]> {
  // TODO: Maybe load other directories recursively. For now only the current directory is read.

  const files = await fs.readdir(dirPath, { withFileTypes: true });

  return files
    .filter((dirent) => dirent.isFile())
    .map(({ name }) => ({
      name,
      absPath: join(dirPath, name),
    }));
}