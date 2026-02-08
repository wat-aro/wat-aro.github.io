import fs from 'fs';
import { execFileSync } from 'child_process';
import matter from 'gray-matter';

const beforeSha = process.argv[2];
const afterSha = process.argv[3];

if (!beforeSha || !afterSha) {
  throw new Error('Usage: ts-node scripts/changed-og-slugs.ts <beforeSha> <afterSha>');
}

const changedFiles = execFileSync(
  'git',
  ['diff', '--name-only', beforeSha, afterSha, '--', 'contents/posts/'],
  { encoding: 'utf8' }
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
    });
    beforeTitle = matter(previousContent).data.title ?? null;
  } catch {}

  try {
    const currentContent = fs.readFileSync(file, 'utf8');
    afterTitle = matter(currentContent).data.title ?? null;
  } catch {}

  if (beforeTitle !== afterTitle) {
    changedSlugs.add(slug);
  }
}

process.stdout.write(Array.from(changedSlugs).join(','));
