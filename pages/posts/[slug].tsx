import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { join } from 'path';
import { Layout } from '../../components/Layout';
import { MarkDownPost } from '../../components/MarkDownPost';
import { getPostByPath, getPostBySlug } from '../../lib/api';
import { getFiles } from '../../lib/getFiles';
import { markdownToHtml } from '../../lib/markdownToHtml';

const contentsDir = join(process.cwd(), 'contents');

export const getStaticPaths: GetStaticPaths = async () => {
  const postsDir = join(contentsDir, 'posts');
  const files = await getFiles(postsDir);
  const slugs = files.map((file) =>
    file.split('/').slice(-1)[0].replace(/\.md$/, '')
  );

  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
};

type Props = {
  title: string;
  published: string;
  tags?: string[];
  content: string;
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
    props: { ...post.data, content },
  };
};

const Post: React.FC<Props> = ({ title, published, tags, content }) => {
  return (
    <>
      <Head>
        <title>{title} | (wat-aro)</title>
      </Head>
      <Layout>
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
