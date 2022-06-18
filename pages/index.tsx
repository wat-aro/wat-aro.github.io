import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { Layout } from '../components/Layout';
import { Pagination } from '../components/Pagination';
import { PostList } from '../components/PostList';
import { range } from '../lib/range';
import { sortByPublishedDate } from '../lib/sortByPublishedDate';
import PostRepository from '../lib/repositories/post';
import { PostWithoutContent } from '../lib/post';
import { postsPagePath } from '../lib/path';
import { TagList } from '../components/TagList';

type Props = {
  posts: PostWithoutContent[];
  currentPage: number;
  pages: number[];
  tags: string[];
};

const perPage = 20;

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const currentPage = 1;
  const posts = await PostRepository.list();
  const tags = new Set<string>();
  posts.forEach((post) => {
    post.data.tags?.forEach((tag) => {
      tags.add(tag);
    });
  });
  const sorted = sortByPublishedDate(posts);
  const sliced = sorted.slice(
    perPage * (currentPage - 1),
    perPage * currentPage
  );
  const maxPageNumer = Math.ceil(posts.length / 20);
  const pages = range(maxPageNumer);

  return {
    props: { posts: sliced, currentPage, pages, tags: Array.from(tags).sort() },
  };
};

const Posts: NextPage<Props> = ({ currentPage, pages, posts, tags }) => {
  return (
    <>
      <Head>
        <title>Posts | (wat-aro)</title>
      </Head>
      <Layout>
        <TagList tags={tags} />
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
