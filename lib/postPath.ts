import { Post } from './api';

// NOTE: # => '%23' => '%2523'
const encodedSharp = encodeURIComponent(encodeURIComponent('#'));

export const postPath = (post: Post): string =>
  `/posts/${post.slug.replaceAll('#', encodedSharp)}`;
