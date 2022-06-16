import { Post } from '../../lib/api';
import { PostListItem } from '../PostListItem';

const sortByPublishedDate = (posts: Post[]): Post[] => {
  const copied = [...posts];
  copied.sort((x, y) => {
    return new Date(x.data.published).getTime() <
      new Date(y.data.published).getTime()
      ? 1
      : -1;
  });
  return copied;
};

type Props = {
  posts: Post[];
};

export const PostList: React.FC<Props> = ({ posts }) => {
  const sorted = sortByPublishedDate(posts);

  return (
    <>
      {sorted.map((post) => (
        <PostListItem post={post} />
      ))}
    </>
  );
};
