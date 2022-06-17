import { PostWithoutContent } from '../../lib/post';
import { PostListItem } from '../PostListItem';

type Props = {
  posts: PostWithoutContent[];
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
