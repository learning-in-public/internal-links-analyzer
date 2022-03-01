import * as fs from 'node:fs/promises';
import { join } from 'node:path';
import type { File } from './types.js';

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
