import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { join } from 'path';
import { Layout } from '../../components/Layout';
import { MarkDownPost } from '../../components/MarkDownPost';
import { getFiles } from '../../lib/getFiles';
import { markdownToHtml } from '../../lib/markdownToHtml';
import PostRepository from '../../lib/repositories/post';
import type { Post } from '../../lib/post';

export const getStaticPaths: GetStaticPaths = async () => {
  const postsDir = join(process.cwd(), 'contents', 'posts');
  const files = await getFiles(postsDir);
  const slugs = files.map((file) =>
    file.split('/').slice(-1)[0].replace(/\.md$/, '')
  );

  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
};

type Props = {
  post: Post;
  content: string;
};

type Params = {
  slug: string;
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const post = await PostRepository.findBySlug(params!.slug);
  const content = await markdownToHtml(post.content);

  return {
    props: {
      post,
      content,
    },
  };
};

const PostPage: React.FC<Props> = ({ post, content }) => {
  const description = post.content.replace(/[#\n]/g, '')?.slice(0, 160) || '';
  const ogImage = `https://wat-aro.dev/og-images/${post.slug}.png`;
  const { title, published, tags } = post;

  return (
    <>
      <Head>
        <title>{title} | (wat-aro)</title>
      </Head>
      <Layout
        title={`${title} | (wat-aro)`}
        description={description}
        ogImage={ogImage}
      >
        <MarkDownPost
          title={title}
          published={published}
          tags={tags}
          content={content}
        />
      </Layout>
    </>
  );
};

export default PostPage;
