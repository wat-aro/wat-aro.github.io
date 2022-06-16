import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { join } from 'path';
import { Layout } from '../../components/Layout';
import { MarkDownPost } from '../../components/MarkDownPost';
import { getPostBySlug } from '../../lib/api';
import { getFiles } from '../../lib/getFiles';
import { markdownToHtml } from '../../lib/markdownToHtml';

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
  title: string;
  published: string;
  tags?: string[];
  content: string;
  slug: string;
  rawContent?: string;
};

type Params = {
  slug: string;
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const post = getPostBySlug(`contents/posts/${params!.slug}.md`);
  const content = await markdownToHtml(post.content);

  return {
    props: {
      ...post.data,
      content,
      slug: params!.slug,
      rawContent: post.content,
    },
  };
};

const Post: React.FC<Props> = ({
  title,
  published,
  tags,
  content,
  slug,
  rawContent,
}) => {
  const description = rawContent?.replace(/[#\n]/g, '')?.slice(0, 160) || '';
  const ogImage = `https://wat-aro.dev/og-images/${slug}.png`;

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

export default Post;
