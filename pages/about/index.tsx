import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
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
  const post = getPostBySlug('pages/about/about.md');
  const content = await markdownToHtml(post.content);

  return {
    props: { ...post.data, content },
  };
};

const About: NextPage<Props> = ({ title, published, tags, content }) => {
  return (
    <>
      <Head>
        <title>(wat-aro) | about</title>
      </Head>
      <MarkDownPost
        title={title}
        published={published}
        tags={tags}
        content={content}
      />
    </>
  );
};

export default About;
