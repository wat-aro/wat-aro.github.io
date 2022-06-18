import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { join } from 'path';
import { Layout } from '../../../components/Layout';
import { Pagination } from '../../../components/Pagination';
import { PostList } from '../../../components/PostList';
import { getFiles } from '../../../lib/getFiles';
import { range } from '../../../lib/range';
import { sortByPublishedDate } from '../../../lib/sortByPublishedDate';
import PostRepository from '../../../lib/repositories/post';
import { PostWithoutContent } from '../../../lib/post';
import { postsPagePath } from '../../../lib/path';

type Params = {
  page: string;
};

const perPage = 20;

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const postsDir = join(process.cwd(), 'contents', 'posts');
  const files = await getFiles(postsDir);
  const maxPageNumer = Math.ceil(files.length / 20);
  const pages = range(maxPageNumer).map((i) => String(i));
  const paths = pages.map((page) => ({ params: { page } }));

  return {
    paths,
    fallback: false,
  };
};

type Props = {
  posts: PostWithoutContent[];
  currentPage: number;
  pages: number[];
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const currentPage = Number(params!.page);
  const posts = await PostRepository.list();
  const sorted = sortByPublishedDate(posts);
  const sliced = sorted.slice(
    perPage * (currentPage - 1),
    perPage * currentPage
  );
  const maxPageNumer = Math.ceil(posts.length / 20);
  const pages = range(maxPageNumer);

  return {
    props: { posts: sliced, currentPage, pages },
  };
};

const Posts: NextPage<Props> = ({ posts, pages, currentPage }) => {
  return (
    <>
      <Head>
        <title>Posts | (wat-aro)</title>
      </Head>
      <Layout>
        <h1 className="text-3xl mb-4">Posts</h1>
        <PostList posts={posts} />
        <Pagination
          pages={pages}
          currentPage={currentPage}
          pathFunc={postsPagePath}
        />
      </Layout>
    </>
  );
};

export default Posts;
