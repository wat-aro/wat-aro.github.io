import { PostWithoutContent } from './post';

export const sortByPublishedDate = (
  posts: PostWithoutContent[]
): PostWithoutContent[] => {
  const copied = [...posts];
  copied.sort((x, y) => {
    return new Date(x.published).getTime() < new Date(y.published).getTime()
      ? 1
      : -1;
  });
  return copied;
};
