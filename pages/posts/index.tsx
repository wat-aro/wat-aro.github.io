import { GetStaticProps } from 'next';
import { join } from 'path';
import { getFiles } from '../../lib/getFiles';
import { getPostByPath, Post } from '../../lib/api';
import Head from 'next/head';
import { Layout } from '../../components/Layout';
import { PostList } from '../../components/PostList';

export const getStaticProps: GetStaticProps = async () => {
  const contentsDir = join(process.cwd(), 'contents');
  const postsDir = join(contentsDir, 'posts');
  const files = await getFiles(postsDir);
  const posts = files.map((file) => getPostByPath(file));

  return {
    props: { posts },
  };
};

type Props = {
  posts: Post[];
};

const Posts: React.FC<Props> = ({ posts }) => {
  return (
    <>
      <Head>
        <title>Posts | (wat-aro)</title>
      </Head>
      <Layout>
        <h1 className="text-3xl mb-4">Posts</h1>
        <PostList posts={posts} />
      </Layout>
    </>
  );
};

export default Posts;
