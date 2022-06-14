import { Post } from './api';

export const postPath = (post: Post): string => `/posts/${post.slug}`;
