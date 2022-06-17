import { Post } from './post';

// NOTE: # => '%23' => '%2523'
const encodedSharp =
  process.env.NODE_ENV == 'production'
    ? encodeURIComponent(encodeURIComponent('#'))
    : encodeURIComponent('#');

export const postPath = (post: { slug: string }): string =>
  `/posts/${post.slug.replaceAll('#', encodedSharp)}`;

export const postsPagePath = (page: number): string => `/posts/pages/${page}`;
