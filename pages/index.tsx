import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { join } from 'path';
import { Layout } from '../components/Layout';
import { getPostByPath, PostData } from '../lib/api';
import { getFiles } from '../lib/getFiles';

export const getStaticProps: GetStaticProps = async () => {
  const contentsDir = join(process.cwd(), 'contents');
  const postsDir = join(contentsDir, 'posts');
  const files = await getFiles(postsDir);
  const posts = files.map((file) => ({
    ...getPostByPath(file),
    slug: file.split('/').splice(-1)[0].replace(/\.md$/, ''),
  }));

  return {
    props: { posts },
  };
};

type Post = {
  slug: string;
  data: PostData;
  content: string;
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
      <Layout title="TOP" description="wat-aro のサイト" ogImage="">
        {posts.map((post) => (
          <Link href={`/posts/${post.slug}`} key={post.slug}>
            <a className="hover:border-b-2">
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
