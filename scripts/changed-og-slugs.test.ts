import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { changedOgSlugs } from './changed-og-slugs';

const git = (cwd: string, ...args: string[]) =>
  execFileSync('git', args, { cwd, encoding: 'utf8' }).trim();

const write = (cwd: string, file: string, content: string) => {
  const fullPath = path.join(cwd, file);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content);
};

const post = (title: string, body = 'Body') =>
  `---
title: ${title}
---
${body}
`;

const createTempRepo = () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'changed-og-slugs-'));
  git(tmpDir, 'init');
  git(tmpDir, 'config', 'user.name', 'test');
  git(tmpDir, 'config', 'user.email', 'test@example.com');
  return tmpDir;
};

const commitPosts = (
  cwd: string,
  message: string,
  posts: Record<string, { title: string; body: string }>
) => {
  for (const [slug, content] of Object.entries(posts)) {
    write(cwd, `contents/posts/${slug}.md`, post(content.title, content.body));
  }
  git(cwd, 'add', '.');
  git(cwd, 'commit', '-m', message);
  return git(cwd, 'rev-parse', 'HEAD');
};

const testChangedOgSlugs = () => {
  const repo = createTempRepo();
  const beforeSha = commitPosts(repo, 'initial', {
    'no-title-change': { title: 'No Title Change', body: 'v1' },
    'title-changed': { title: 'Old Title', body: 'v1' },
  });
  const afterSha = commitPosts(repo, 'update', {
    'no-title-change': { title: 'No Title Change', body: 'v2' },
    'title-changed': { title: 'New Title', body: 'v2' },
    'new-post': { title: 'New Post', body: 'v1' },
  });

  const actual = changedOgSlugs(beforeSha, afterSha, repo).sort();
  const expected = ['new-post', 'title-changed'];
  assert.deepEqual(actual, expected);
};

testChangedOgSlugs();
console.log('changed-og-slugs test passed');
