import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { join } from 'path';
import { Layout } from '../components/Layout';
import { getPostByPath, Post } from '../lib/api';
import { getFiles } from '../lib/getFiles';
import { postPath } from '../lib/postPath';

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

// TODO: og image を設定する
const Home: NextPage<Props> = ({ posts }) => {
  posts.sort((x, y) => {
    return new Date(x.data.published).getTime() <
      new Date(y.data.published).getTime()
      ? 1
      : -1;
  });

  return (
    <>
      <Head>
        <title>(wat-aro)</title>
      </Head>
      <Layout>
        {posts.map((post) => (
          <Link href={postPath(post)} key={post.slug}>
            <a className="border-b-2 border-gray-200 border-opacity-0 hover:border-opacity-100">
              <div className="flex pt-2 pb-1 justify-between">
                <div className="text-xl md:w-5/6 w-9/12">{post.data.title}</div>
                <div className="text-gray-500 md:w-1/6 w-3/12 flex justify-end">
                  {post.data.published}
                </div>
              </div>
            </a>
          </Link>
        ))}
      </Layout>
    </>
  );
};

export default Home;
