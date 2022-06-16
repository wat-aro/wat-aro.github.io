import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { join } from 'path';
import { Layout } from '../../../components/Layout';
import { PostList } from '../../../components/PostList';
import { getPostByPath, Post } from '../../../lib/api';
import { getFiles } from '../../../lib/getFiles';
import { sortByPublishedDate } from '../../../lib/sortByPublishedDate';

type Params = {
  page: string;
};

const perPage = 20;

const toPages = (n: number): string[] =>
  Array(n)
    .fill('')
    .map((_, index) => String(index + 1));

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const postsDir = join(process.cwd(), 'contents', 'posts');
  const files = await getFiles(postsDir);
  const maxPageNumer = Math.ceil(files.length / 20);
  const pages = toPages(maxPageNumer);
  const paths = pages.map((page) => ({ params: { page } }));

  return {
    paths,
    fallback: false,
  };
};

type Props = {
  posts: Post[];
  page: number;
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const page = Number(params!.page);
  const postsDir = join(process.cwd(), 'contents', 'posts');
  const files = await getFiles(postsDir);
  const posts = files.map((file) => getPostByPath(file));
  const sorted = sortByPublishedDate(posts);
  const sliced = sorted.slice(perPage * (page - 1), perPage * page);

  return {
    props: { posts: sliced, page },
  };
};

const Posts: NextPage<Props> = (props) => {
  return (
    <>
      <Head>
        <title>Posts | (wat-aro)</title>
      </Head>
      <Layout>
        <h1 className="text-3xl mb-4">Posts</h1>
        <PostList posts={props.posts} page={props.page} />
      </Layout>
    </>
  );
};

export default Posts;
