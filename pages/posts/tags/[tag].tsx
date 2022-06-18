import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { Layout } from '../../../components/Layout';
import { PostList } from '../../../components/PostList';
import { PostWithoutContent } from '../../../lib/post';
import PostRepository from '../../../lib/repository/post';

type Params = {
  tag: string;
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const tags = new Set<string>();
  const posts = await PostRepository.list();
  posts.forEach((post) => {
    post.data.tags?.forEach((tag) => {
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
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const posts = await PostRepository.listByTag(params!.tag);

  return {
    props: { posts, tag: params!.tag },
  };
};

const Posts: NextPage<Props> = ({ posts, tag }) => {
  return (
    <>
      <Head>
        <title>{tag} | (wat-aro)</title>
      </Head>
      <Layout title={`${tag}`} description={`${tag}`}>
        <h1 className="text-3xl mb-4">{tag}</h1>
        <PostList posts={posts} />
      </Layout>
    </>
  );
};

export default Posts;
