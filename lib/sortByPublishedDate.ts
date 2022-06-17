import { Post } from './post';

export const sortByPublishedDate = (posts: Post[]): Post[] => {
  const copied = [...posts];
  copied.sort((x, y) => {
    return new Date(x.data.published).getTime() <
      new Date(y.data.published).getTime()
      ? 1
      : -1;
  });
  return copied;
};
