import fs from 'fs';
import { execFileSync } from 'child_process';
import path from 'path';
import matter from 'gray-matter';

export const changedOgSlugs = (
  beforeSha: string,
  afterSha: string,
  cwd = process.cwd()
) => {
  const changedFiles = execFileSync(
    'git',
    ['diff', '--name-only', beforeSha, afterSha, '--', 'contents/posts/'],
    { encoding: 'utf8', cwd }
  )
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('contents/posts/') && line.endsWith('.md'));

  const changedSlugs = new Set<string>();

  for (const file of changedFiles) {
    const slug = file.replace(/^contents\/posts\//, '').replace(/\.md$/, '');

    let beforeTitle: string | null = null;
    let afterTitle: string | null = null;

    try {
      const previousContent = execFileSync('git', ['show', `${beforeSha}:${file}`], {
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'ignore'],
        cwd,
      });
      beforeTitle = matter(previousContent).data.title ?? null;
    } catch {}

    try {
      const currentContent = fs.readFileSync(path.join(cwd, file), 'utf8');
      afterTitle = matter(currentContent).data.title ?? null;
    } catch {}

    if (beforeTitle !== afterTitle) {
      changedSlugs.add(slug);
    }
  }

  return Array.from(changedSlugs);
};

if (require.main === module) {
  const beforeSha = process.argv[2];
  const afterSha = process.argv[3];

  if (!beforeSha || !afterSha) {
    throw new Error('Usage: ts-node scripts/changed-og-slugs.ts <beforeSha> <afterSha>');
  }

  process.stdout.write(changedOgSlugs(beforeSha, afterSha).join(','));
}
