import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { MarkDownLayout } from '../../components/MarkDownLayout';
import { getPostBySlug } from '../../lib/api';
import { markdownToHtml } from '../../lib/markdownToHtml';

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { slug: 'about' } }],
    fallback: true,
  };
};

type Props = {
  title: string;
  published: string;
  tags: string[];
  content: string;
};

type Params = {
  slug: string;
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const post = getPostBySlug(params!.slug);
  const content = await markdownToHtml(post.content);

  return {
    props: { ...post.data, content },
  };
};

const Post: React.FC<Props> = ({ title, published, tags, content }) => {
  return (
    <>
      <Head>
        <title>(wat-aro) | {title}</title>
      </Head>
      <MarkDownLayout
        title={title}
        published={published}
        tags={tags}
        content={content}
      />
    </>
  );
};

export default Post;
