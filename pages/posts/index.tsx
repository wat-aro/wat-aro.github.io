import { GetStaticProps } from 'next';
import { join } from 'path';
import { getFiles } from '../../lib/getFiles';
import { getPostByPath, PostData } from '../../lib/api';
import Link from 'next/link';
import Head from 'next/head';

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

const Posts: React.FC<Props> = ({ posts }) => {
  posts.sort((x, y) => {
    return new Date(x.data.published).getTime() <
      new Date(y.data.published).getTime()
      ? 1
      : -1;
  });

  return (
    <>
      <Head>
        <title>(wat-aro) | Posts</title>
      </Head>
      <div className="flex md:justify-center justify-between w-full">
        <div className="flex flex-col md:w-9/12 w-full py-4 px-4">
          <h1 className="text-3xl mb-8">Posts</h1>
          {posts.map((post) => (
            <Link href={`/posts/${post.slug}`} key={post.slug}>
              <a className="hover:border-b-2">
                <div className="flex pt-2 pb-1 justify-between">
                  <div className="text-xl md:w-5/6 w-9/12">
                    {post.data.title}
                  </div>
                  <div className="text-gray-500 md:w-1/6 w-3/12 flex justify-end">
                    {post.data.published}
                  </div>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Posts;