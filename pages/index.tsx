import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { join } from 'path';
import { Layout } from '../components/Layout';
import { PostList } from '../components/PostList';
import { getPostByPath, Post } from '../lib/api';
import { getFiles } from '../lib/getFiles';
import { sortByPublishedDate } from '../lib/sortByPublishedDate';

type Props = {
  posts: Post[];
  page: number;
};

const perPage = 20;

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const page = 1;
  const postsDir = join(process.cwd(), 'contents', 'posts');
  const files = await getFiles(postsDir);
  const posts = files.map((file) => getPostByPath(file));
  const sorted = sortByPublishedDate(posts);
  const sliced = sorted.slice(perPage * (page - 1), perPage * page);

  return {
    props: { posts: sliced, page },
  };
};

const Posts: NextPage<Props> = ({ page, posts }) => {
  return (
    <>
      <Head>
        <title>Posts | (wat-aro)</title>
      </Head>
      <Layout>
        <h1 className="text-3xl mb-4">Posts</h1>
        <PostList posts={posts} page={page} />
      </Layout>
    </>
  );
};

export default Posts;
