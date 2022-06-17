import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { join } from 'path';
import { Layout } from '../components/Layout';
import { Pagination } from '../components/Pagination';
import { PostList } from '../components/PostList';
import { getFiles } from '../lib/getFiles';
import { range } from '../lib/range';
import { sortByPublishedDate } from '../lib/sortByPublishedDate';
import PostRepository from '../lib/repository/post';
import { Post } from '../lib/post';

type Props = {
  posts: Post[];
  currentPage: number;
  pages: number[];
};

const perPage = 20;

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
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

const Posts: NextPage<Props> = ({ currentPage, pages, posts }) => {
  return (
    <>
      <Head>
        <title>Posts | (wat-aro)</title>
      </Head>
      <Layout>
        <PostList posts={posts} />
        <Pagination pages={pages} currentPage={currentPage} />
      </Layout>
    </>
  );
};

export default Posts;
