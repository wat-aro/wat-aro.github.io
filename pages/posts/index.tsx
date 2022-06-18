import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { Layout } from '../../components/Layout';
import { Pagination } from '../../components/Pagination';
import { PostList } from '../../components/PostList';
import { range } from '../../lib/range';
import { sortByPublishedDate } from '../../lib/sortByPublishedDate';
import PostRepository from '../../lib/repositories/post';
import { PostWithoutContent } from '../../lib/post';
import { postsPagePath } from '../../lib/path';

const perPage = 20;

type Props = {
  posts: PostWithoutContent[];
  currentPage: number;
  pages: number[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const currentPage = 1;
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
