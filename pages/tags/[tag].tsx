import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { Layout } from '../../components/Layout';
import { Pagination } from '../../components/Pagination';
import { ContentList } from '../../components/ContentList';
import { postPath, tagsPagePath } from '../../lib/path';
import { PostWithoutContent } from '../../lib/post';
import { range } from '../../lib/range';
import PostRepository from '../../lib/repositories/post';
import { sortByPublishedDate } from '../../lib/sortByPublishedDate';

type Params = {
  tag: string;
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const tags = new Set<string>();
  const posts = await PostRepository.list();
  posts.forEach((post) => {
    post.tags?.forEach((tag) => {
      tags.add(tag);
    });
  });

  return {
    paths: Array.from(tags).map((tag) => ({ params: { tag } })),
    fallback: false,
  };
};

type Props = {
  posts: PostWithoutContent[];
  tag: string;
  currentPage: number;
  pages: number[];
};

const perPage = 20;

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const currentPage = 1;
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

const Tag: NextPage<Props> = ({ posts, tag, pages, currentPage }) => {
  const entries = posts.map((post) => ({
    title: post.title,
    published: post.published,
    path: postPath({ slug: post.slug }),
  }));

  return (
    <>
      <Head>
        <title>{tag} | (wat-aro)</title>
      </Head>
      <Layout title={`${tag}`} description={`${tag}`}>
        <h1 className="text-3xl mb-4">{tag}</h1>
        <ContentList entries={entries} />
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

export default Tag;
