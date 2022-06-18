import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { Layout } from '../../../../components/Layout';
import { Pagination } from '../../../../components/Pagination';
import { PostList } from '../../../../components/PostList';
import { tagsPagePath } from '../../../../lib/path';
import { PostWithoutContent } from '../../../../lib/post';
import { range } from '../../../../lib/range';
import PostRepository from '../../../../lib/repositories/post';
import { sortByPublishedDate } from '../../../../lib/sortByPublishedDate';

type Params = {
  tag: string;
  page: string;
};

type Tags = {
  [key: string]: number;
};

const perPage = 20;

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const tags: Tags = {};
  const posts = await PostRepository.list();
  posts.forEach((post) => {
    post.data.tags?.forEach((tag) => {
      if (tags[tag]) {
        tags[tag] += 1;
      } else {
        tags[tag] = 1;
      }
    });
  });

  const paths = Object.entries(tags)
    .map(([tag, count]) => {
      const pages = range(Math.ceil(count / perPage));
      return pages.map((page) => ({
        params: { tag, page: String(page) },
      }));
    })
    .flat();

  return {
    paths,
    fallback: false,
  };
};

type Props = {
  posts: PostWithoutContent[];
  tag: string;
  currentPage: number;
  pages: number[];
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const currentPage = Number(params!.page);
  const posts = await PostRepository.listByTag(params!.tag);
  const sorted = sortByPublishedDate(posts);
  const sliced = sorted.slice(
    perPage * (currentPage - 1),
    perPage * currentPage
  );
  const maxPageNumer = Math.ceil(posts.length / 20);
  const pages = range(maxPageNumer);

  return {
    props: { posts: sliced, currentPage, pages, tag: params!.tag },
  };
};

const TagPage: NextPage<Props> = ({ posts, tag, pages, currentPage }) => {
  return (
    <>
      <Head>
        <title>{tag} | (wat-aro)</title>
      </Head>
      <Layout title={`${tag}`} description={`${tag}`}>
        <h1 className="text-3xl mb-4">{tag}</h1>
        <PostList posts={posts} />
        {pages.length > 1 && (
          <Pagination
            pages={pages}
            currentPage={currentPage}
            pathFunc={tagsPagePath(tag)}
          />
        )}
      </Layout>
    </>
  );
};

export default TagPage;
