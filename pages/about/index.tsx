import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { Layout } from '../../components/Layout';
import { MarkDownPost } from '../../components/MarkDownPost';
import { markdownToHtml } from '../../lib/markdownToHtml';
import AboutRepository from '../../lib/repositories/about';

type Props = {
  title: string;
  published: string;
  tags?: string[];
  content: string;
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const post = await AboutRepository.find();
  const content = await markdownToHtml(post.content);

  return {
    props: { ...post, content },
  };
};

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
