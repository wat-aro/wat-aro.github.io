import { promisify } from 'util';
import path from 'path';
import fs from 'fs';

export const getFiles = async (dir: string): Promise<string[]> => {
  const subdirs = await promisify(fs.readdir)(dir);
  const files = await Promise.all(
    subdirs.map(async (subdir) => {
      const res = path.resolve(dir, subdir);
      return (await promisify(fs.stat)(res)).isDirectory()
        ? getFiles(res)
        : [res];
    })
  );
  return files.reduce((a, f) => a.concat(f), []);
};
