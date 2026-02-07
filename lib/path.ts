import { normalizeTag } from './tag';

// NOTE: # => '%23' => '%2523'
const encodedSharp =
  process.env.NODE_ENV == 'production'
    ? encodeURIComponent(encodeURIComponent('#'))
    : encodeURIComponent('#');

export const postPath = (post: { slug: string }): string =>
  `/posts/${post.slug.replaceAll('#', encodedSharp)}`;

export const postsPagePath = (page: number): string => `/posts/pages/${page}`;

export const tagsPagePath =
  (tag: string) =>
  (page: number): string =>
    `/tags/${encodeURIComponent(normalizeTag(tag))}/pages/${page}`;

export const tagPath = (tag: string) =>
  `/tags/${encodeURIComponent(normalizeTag(tag))}`;
