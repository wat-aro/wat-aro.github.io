import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { join } from 'path';
import { Layout } from '../components/Layout';
import { PostList } from '../components/PostList';
import { getPostByPath, Post } from '../lib/api';
import { getFiles } from '../lib/getFiles';

export const getStaticProps: GetStaticProps = async () => {
  const postsDir = join(process.cwd(), 'contents', 'posts');
  const files = await getFiles(postsDir);
  const posts = files.map((file) => getPostByPath(file));

  return {
    props: { posts },
  };
};

type Props = {
  posts: Post[];
};

const Home: NextPage<Props> = ({ posts }) => {
  return (
    <>
      <Head>
        <title>(wat-aro)</title>
      </Head>
      <Layout>
        <PostList posts={posts} />
      </Layout>
    </>
  );
};

export default Home;
