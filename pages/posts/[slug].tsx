import { GetStaticPaths, GetStaticProps } from 'next';
import { Layout } from '../../components/Layout';
import { getPostBySlug } from '../../lib/api';
import { markdownToHtml } from '../../lib/markdownToHtml';

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { slug: 'about' } }],
    fallback: true,
  };
};

type Props = {
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
    props: { content },
  };
};

const Post: React.FC<Props> = ({ content }) => {
  return (
    <Layout>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </Layout>
  );
};

export default Post;
