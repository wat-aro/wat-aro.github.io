import { Post } from '../../lib/api';
import { PostListItem } from '../PostListItem';

type Props = {
  posts: Post[];
};

export const PostList: React.FC<Props> = ({ posts }) => {
  return (
    <>
      {posts.map((post) => (
        <PostListItem post={post} key={post.slug} />
      ))}
    </>
  );
};
