import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { Layout } from '../../components/Layout';
import { MarkDownPost } from '../../components/MarkDownPost';
import { getPostBySlug } from '../../lib/api';
import { markdownToHtml } from '../../lib/markdownToHtml';

type Props = {
  title: string;
  published: string;
  tags?: string[];
  content: string;
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const post = getPostBySlug('contents/about.md');
  const content = await markdownToHtml(post.content);

  return {
    props: { ...post.data, content },
  };
};

// TODO: og image を設定する
const About: NextPage<Props> = ({ title, published, tags, content }) => {
  return (
    <>
      <Head>
        <title>about | (wat-aro)</title>
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

export default About;
