import { Post } from '../../lib/api';
import { PostListItem } from '../PostListItem';

type Props = {
  posts: Post[];
  page: number;
};

export const PostList: React.FC<Props> = ({ posts, page }) => {
  return (
    <>
      {posts.map((post) => (
        <PostListItem post={post} key={post.slug} />
      ))}
    </>
  );
};
