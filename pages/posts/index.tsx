import { GetStaticProps } from 'next';
import { join } from 'path';
import { getFiles } from '../../lib/getFiles';
import { getPostByPath, PostData } from '../../lib/api';

export const getStaticProps: GetStaticProps = async () => {
  const contentsDir = join(process.cwd(), 'contents');
  const postsDir = join(contentsDir, 'posts');
  const files = await getFiles(postsDir);
  const posts = files.map((file) => getPostByPath(file));

  return {
    props: { posts },
  };
};

type Post = {
  data: PostData;
  content: string;
};

type Props = {
  posts: Post[];
};

const Posts: React.FC<Props> = ({ posts }) => {
  const p = posts.sort((x, y) => {
    return new Date(x.data.published).getTime() <
      new Date(y.data.published).getTime()
      ? 1
      : -1;
  });
  console.log(posts.map((post) => post.data));
  return <div>Posts</div>;
};

export default Posts;
